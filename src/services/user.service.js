export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(data) {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }

  async removeById(id) {
    try {
      return await this.userRepository.removeById(id);
    } catch (error) {
      console.error(error);
    }
  }

  async update(id, data) {
    try {
      return await this.userRepository.update(id, data);
    } catch (error) {
      console.error(error);
    }
  }
}
