import { getRepository, getConnection } from 'typeorm';
import { User } from '../../src/entity/User';
import {
  hashPassword,
  generateAccessToken
} from '../../src/util/authUtils';
import {} from 'ts-jest';
import * as app from '../../src/app';
import * as request from 'supertest';

let server, user, accessToken, toolId;
const API_VERSION = process.env.API_VERSION;

beforeAll(async () => {
  server = await app.startServer();
  user = new User();
  user.email = 'test@edtech.com';
  user.passwordHash = await hashPassword('test');
  user.username = 'Bob';
  user.userId = 1;
  user.isAdmin = false;
  accessToken = await generateAccessToken(user);
  await getRepository(User).save(user);
});
afterAll(async () => {
  if (server) {
    await server.close();
  }
  await getConnection().close();
});

describe('Tool creation tests', () => {
  test('POST /tool/create Creat Tool Test, should return 200', async () => {
    const response = await request(server)
      .post(API_VERSION + '/tool/create')
      .auth(accessToken, {
        type: 'bearer'
      })
      .send({
        name: 'testTool',
        description: 'test',
        images: [],
        category: [],
        website: 'test'
      })
      .expect(200);
      expect(response.body).toHaveProperty('toolId');
      toolId = response.body.toolId;
  });
  test('POST /tool/create Creat Tool with duplicate name, should return 400', async () => {
    const response = await request(server)
      .post(API_VERSION + '/tool/create')
      .auth(accessToken, {
        type: 'bearer'
      })
      .send({
        name: 'testTool',
        description: 'test',
        images: [],
        category: [],
        website: 'test'
      })
      .expect(400);
  });
});

describe('Get tool tests', () => {
  test('GET /tool/:id Get the tool created, should return 200', async () => {
    const response = await request(server)
      .get(API_VERSION + '/tool/'+ toolId)
      .expect(200);
      expect(response.body.name).toBe('testTool');
  });
  test('GET /tool/:id Get a invalid tool, should return 400', async () => {
    const response = await request(server)
    .get(API_VERSION + '/tool/999')
    .expect(400);
  });
});
