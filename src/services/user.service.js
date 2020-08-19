import { Op } from 'sequelize';

import { User } from '../models';

export const createUser = async (login, password, age) => {
  const user = await User.create({ login, password, age });
  return user;
};

export const findUser = async (id) => {
  const [user] = await User.findAll({
    where: { id }
  });
  return user;
};

export const findAllUser = async (substring = '', limit = 10) => {
  const users = await User.findAll({
    where: {
      login: {
        [Op.substring]: substring
      }
    },
    limit,
    order: [
      ['login', 'ASC']
    ]
  });
  return users;
};

export const removeUser = async (id) => {
  const user = await User.destroy({
    where: { id }
  });
  return user;
};

export const updateUser = async (id, login, password, age) => {
  const user = await User.update(
    { login, password, age },
    { where: { id } }
  );

  return user;
};
