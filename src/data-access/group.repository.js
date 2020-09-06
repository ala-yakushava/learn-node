import { Op } from 'sequelize';
import { Group, User } from '../models';

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
    const group = await Group.findByPk(groupId);

    const users = await User.findAll({
      where: {
        id: {
          [Op.or]: userIds
        }
      }
    });

    if (!group || !users.length) return;
    return await group.addUsers(users);
  }
}
