import { userController } from '../src/controllers';
import { userService } from '../src/controllers/setup';
import { user, users, otherUser, id, params } from './mock-data';

jest.mock('../src/controllers/setup');

describe('Tests for userController', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn(),
      send: jest.fn()
    };
  });

  test('should find user by id', async () => {
    const req = {
      params: { id }
    };
    userService.findById.mockImplementationOnce(() => Promise.resolve(user));
    await userController.getUser(req, res);

    expect(userService.findById).toHaveBeenCalledWith(id);
    expect(res.send).toHaveBeenCalledWith(user);
  });

  test('should find all users', async () => {
    const { substring, limit } = params;
    const req = {
      query: { substring, limit }
    };
    userService.findByParams.mockImplementationOnce(() => Promise.resolve(users));
    await userController.getUsers(req, res);

    expect(userService.findByParams).toHaveBeenCalledWith(substring, limit);
    expect(res.send).toHaveBeenCalledWith(users);
  });

  test('should create user', async () => {
    const { login, password, age } = user;
    const req = {
      body: { login, password, age }
    };
    userService.create.mockImplementationOnce(() => Promise.resolve(user));
    await userController.createUser(req, res);

    expect(userService.create).toHaveBeenCalledWith({ login, password, age });
    expect(res.send).toHaveBeenCalledWith(user);
  });

  test('should update user by id', async () => {
    const { login, password, age } = otherUser;
    const req = {
      params: { id },
      body: { login, password, age }
    };
    userService.updateById.mockImplementationOnce(() => Promise.resolve(true));
    await userController.updateUser(req, res);

    expect(userService.updateById).toHaveBeenCalledWith(id, { login, password, age });
    expect(res.send).toHaveBeenCalledWith(`user ${id} is updated`);
  });

  test('should delete user by id', async () => {
    const req = {
      params: { id }
    };
    userService.removeById.mockImplementationOnce(() => Promise.resolve(true));
    await userController.deleteUser(req, res);

    expect(userService.removeById).toHaveBeenCalledWith(id);
    expect(res.send).toHaveBeenCalledWith(`user ${id} is deleted`);
  });
});
