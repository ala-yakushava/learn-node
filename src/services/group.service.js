export class GroupService {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async create(data) {
    try {
      return await this.groupRepository.create(data);
    } catch (error) {
      throw new Error('Group - create', error);
    }
  }

  async findById(id) {
    try {
      return await this.groupRepository.findById(id);
    } catch (error) {
      throw new Error('Group - findById', error);
    }
  }

  async findAll() {
    try {
      return await this.groupRepository.findAll();
    } catch (error) {
      throw new Error('Group - findAll', error);
    }
  }

  async removeById(id) {
    try {
      return await this.groupRepository.removeById(id);
    } catch (error) {
      throw new Error('Group - removeById', error);
    }
  }

  async update(id, data) {
    try {
      return await this.groupRepository.update(id, data);
    } catch (error) {
      throw new Error('Group - update', error);
    }
  }

  async addUsersToGroup(groupId, userIds) {
    try {
      return await this.groupRepository.addUsersToGroup(groupId, userIds);
    } catch (error) {
      throw new Error('Group - addUsersToGroup', error);
    }
  }
}
