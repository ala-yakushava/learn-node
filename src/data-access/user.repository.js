import { Op } from 'sequelize';

import { User } from '../models';

export class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findById(id) {
    return await User.findByPk(id);
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
    return await User.destroy({ where: { id } });
  }

  async update(id, data) {
    const [isSuccess] = await User.update(
      data,
      { where: { id } }
    );

    return !!isSuccess;
  }
}
