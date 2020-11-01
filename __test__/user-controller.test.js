import express from 'express';
import request from 'supertest';

import router from '../src/routes';
import { userService } from '../src/controllers/setup';
import { user, otherUser, users, id } from './mock-data';

jest.mock('../src/controllers/setup');

describe('Tests for the /users path', () => {
  let server;

  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(router);
  });

  afterAll(async () => {
    server.close();
  });

  describe('GET /users/:id', () => {
    test('should response user by id', () => {
      userService.findById.mockImplementationOnce(() => Promise.resolve(user));
      return request(server).get(`/users/${id}`).expect(200, user);
    });
  });

  describe('GET /users', () => {
    test('should response users by query params', () => {
      userService.findByParams.mockImplementationOnce(() => Promise.resolve(users));
      return request(server).get('/users?substring=u&ulimit=2').expect(200, users);
    });
  });

  describe('POST /users', () => {
    test('should create user', () => {
      userService.create.mockImplementationOnce(() => Promise.resolve(user));
      return request(server).post('/users').send(user).expect(201, user);
    });
  });

  describe('PATCH /users/:id', () => {
    test('should update user by id', () => {
      userService.updateById.mockImplementationOnce(() => Promise.resolve(true));
      return request(server).patch(`/users/${id}`).send(otherUser).expect(200, `user ${id} is updated`);
    });
  });

  describe('DELETE /users/:id', () => {
    test('should delete user by id', () => {
      userService.removeById.mockImplementationOnce(() => Promise.resolve(true));
      return request(server).delete(`/users/${id}`).expect(200, `user ${id} is deleted`);
    });
  });
});
