import express from 'express';
import Joi from '@hapi/joi';
import expressJoiValidation from 'express-joi-validation';
import User from './entities/User';

const validator = expressJoiValidation.createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('[a-zA-Z]{1,}[0-9]{1,}')).required(),
  age: Joi.number().min(4).max(130).required()
});

const getAutoSuggestUsers = (users, loginSubstring, limit) => {
  const suggestUsers = users.filter(({ login }) => login.includes(loginSubstring));
  suggestUsers.sort((a, b) => {
    if (a.login > b.login) return 1;
    if (a.login < b.login) return -1;
    return 0;
  });
  return suggestUsers.slice(0, limit);
};

export default () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const users = [
    new User('Sveta', 'xx1x', 44, false),
    new User('Lina', 'yy2y', 38, false),
    new User('Lesha', 'zz3z', 41, false)
  ];

  app.get('/users/:id', (req, res) => {
    const user = users.find((p) => p.id === req.params.id);
    res.send(user);
  });

  app.get('/users', (req, res) => {
    const { loginSubstring, limit } = req.query;
    const suggestUsers = getAutoSuggestUsers(users, loginSubstring, limit);
    res.send(suggestUsers);
  });

  app.post('/users', validator.body(userSchema), (req, res) => {
    const { login, password, age } = req.body;
    const user = new User(login, password, age);
    users.push(user);
    res.send(user);
  });

  app.patch('/users/:id', validator.body(userSchema), (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    const { login, password, age } = req.body;
    user.login = login;
    user.password = password;
    user.age = age;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    user.isDeleted = true;
    res.send(user);
  });

  return app;
};
