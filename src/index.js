import express from 'express';
import User from './entities/User';

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
    new User('Sveta', 'xxx', 44, false),
    new User('Lina', 'yyy', 38, false),
    new User('Lesha', 'zzz', 41, false)
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

  app.post('/users', (req, res) => {
    const { login, password, age } = req.body;
    const user = new User(login, password, age);
    users.push(user);
    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
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
