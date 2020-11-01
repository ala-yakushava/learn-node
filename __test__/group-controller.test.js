import express from 'express';
import request from 'supertest';

import router from '../src/routes';
import { groupService } from '../src/controllers/setup';
import { group, otherGroup, groups, id, ids } from './mock-data';

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

  describe('GET /groups/:id', () => {
    test('should response group by id', () => {
      groupService.findById.mockImplementationOnce(() => Promise.resolve(group));
      return request(server).get(`/groups/${id}`).expect(200, group);
    });
  });

  describe('GET /groups', () => {
    test('should response all groups', () => {
      groupService.findAll.mockImplementationOnce(() => Promise.resolve(groups));
      return request(server).get('/groups').expect(200, groups);
    });
  });

  describe('POST /groups', () => {
    test('should create group', () => {
      groupService.create.mockImplementationOnce(() => Promise.resolve(group));
      return request(server).post('/groups').send(group).expect(201, group);
    });
  });

  describe('PATCH /groups/:id', () => {
    test('should update group by id', () => {
      groupService.updateById.mockImplementationOnce(() => Promise.resolve(true));
      return request(server).patch(`/groups/${id}`).send(otherGroup).expect(200, `group ${id} is updated`);
    });
  });

  describe('DELETE /groups/:id', () => {
    test('should delete group by id', () => {
      groupService.removeById.mockImplementationOnce(() => Promise.resolve(true));
      return request(server).delete(`/groups/${id}`).expect(200, `group ${id} is deleted`);
    });
  });

  describe('POST /groups/add-users', () => {
    test('should users added to group', () => {
      groupService.addUsersToGroup.mockImplementationOnce(() => Promise.resolve(true));
      return request(server)
        .post('/groups/add-users')
        .send({ groupId: id, userIds: ids })
        .expect(200, `users ${ids} are added to group ${id}`);
    });
  });
});
