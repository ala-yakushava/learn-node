import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { UserService } from '../services';
import { UserRepository } from '../data-access';
import { secretOrKey } from '../config';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

passport.use(new LocalStrategy(
  async (username, _password, next) => {
    try {
      const user = await userService.findOne({ login: username });
      if (!user) return next(null, false);
      return next(null, user);
    } catch (err) {
      return next(err);
    }
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey
}, async (jwtPayload, next) => {
  try {
    const user = userService.findById(jwtPayload.id);
    if (!user) return next(null, false);
    return next(null, user);
  } catch (err) {
    return next(err);
  }
}));

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const localAuth = (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ message: 'Authentication failed. Username not found.', user });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.', user: false });
    }

    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
      const token = jwt.sign(user.toJSON(), secretOrKey);
      return res.json({ user, token });
    });
  })(req, res);
};

export const verify = (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    res.status(401).send('Unauthorized');
  }

  try {
    const [, token] = authorization.split(' ');
    jwt.verify(token, secretOrKey);
    return next();
  } catch {
    res.status(403).send('Forbidden');
  }
};

export { passport };
