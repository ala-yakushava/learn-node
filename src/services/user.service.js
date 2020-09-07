export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(data) {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      throw new Error('User create', error);
    }
  }

  async findById(id) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new Error('User findById', error);
    }
  }

  async findByParams(substring = '', limit = 10) {
    const filter = {
      key: 'login',
      value: substring
    };

    const sort = {
      key: 'login',
      order: 'ASC'
    };

    try {
      return await this.userRepository.findByParams(filter, sort, limit);
    } catch (error) {
      throw new Error('User findByParams', error);
    }
  }

  async removeById(id) {
    try {
      return await this.userRepository.removeById(id);
    } catch (error) {
      throw new Error('User removeById', error);
    }
  }

  async update(id, data) {
    try {
      return await this.userRepository.update(id, data);
    } catch (error) {
      throw new Error('User update', error);
    }
  }
}
