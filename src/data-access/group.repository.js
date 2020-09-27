import { Op } from 'sequelize';
import { Group, User } from '../models';
import { sequelize } from '../db';

export class GroupRepository {
  async create(data) {
    return await Group.create(data);
  }

  async findById(id) {
    return await Group.findByPk(id);
  }

  async findAll() {
    return await Group.findAll();
  }

  async removeById(id) {
    return await Group.destroy({ where: { id } });
  }

  async update(id, data) {
    const [isSuccess] = await Group.update(
      data,
      { where: { id } }
    );

    return isSuccess;
  }

  async addUsersToGroup(groupId, userIds) {
    try {
      await sequelize.transaction(async (t) => {
        const group = await Group.findByPk(groupId, { transaction: t });

        const users = await User.findAll({
          where: {
            id: {
              [Op.or]: userIds
            }
          },
          transaction: t
        });

        await group.addUsers(users, { transaction: t });

        return group;
      });
    } catch (error) {
      throw new Error('transaction - failed', error);
    }
  }
}
