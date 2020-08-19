import Joi from '@hapi/joi';
import expressJoiValidation from 'express-joi-validation';

import { createUser, findUser, findAllUser, removeUser, updateUser } from '../services';

const validator = expressJoiValidation.createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('[a-zA-Z]{1,}[0-9]{1,}')).required(),
  age: Joi.number().min(4).max(130).required()
});

export const addRouters = (app) => {
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await findUser(id);
    if (user) return res.send(user);
    res.status(404).send(`user ${id} unknow`);
  });

  app.get('/users', async (req, res) => {
    const { loginSubstring, limit } = req.query;
    const users = await findAllUser(loginSubstring, limit);
    res.send(users);
  });

  app.post('/users', validator.body(userSchema), async (req, res) => {
    const { login, password, age } = req.body;
    const user = await createUser(login, password, age);
    res.status(201).send(user);
  });

  app.patch('/users/:id', validator.body(userSchema), async (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    await updateUser(id, login, password, age);
    res.send(`user ${id} update`);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await removeUser(id);
    res.send(`user ${id} delete`);
  });
};
