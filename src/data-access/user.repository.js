import { Op } from 'sequelize';

import { User } from '../models';

export class UserRepository {
  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async findById(id) {
    const [user] = await User.findAll({
      where: { id }
    });
    return user;
  }

  async findByParams(filter, sort, limit) {
    const users = await User.findAll({
      where: {
        [filter.key]: {
          [Op.substring]: filter.value
        }
      },
      limit,
      order: [
        [sort.key, sort.order]
      ]
    });
    return users;
  }

  async removeById(id) {
    const isSuccess = await User.destroy({
      where: { id }
    });
    return !!isSuccess;
  }

  async update(id, data) {
    const [isSuccess] = await User.update(
      data,
      { where: { id } }
    );

    return !!isSuccess;
  }
}
