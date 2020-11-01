import express from 'express';
import request from 'supertest';

import router from '../src/routes';

describe('Test the root path', () => {
  let server;

  beforeAll(async () => {
    server = express();
    server.use(router);
  });

  afterAll(async () => {
    server.close();
  });

  describe('GET /', () => {
    test('should response Hello World!', () => {
      return request(server).get('/').expect(200, 'Hello World!');
    });
  });

  describe('GET /unknow', () => {
    test('should response Not Found', () => {
      return request(server).get('/unknow').expect(404);
    });
  });
});
