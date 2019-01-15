import { getRepository, getConnection } from 'typeorm';
import { User } from '../../src/entity/User';
import {
  validatePassword,
  hashPassword,
  generateAccessToken
} from '../../src/util/authUtils';
import {} from 'ts-jest';
import * as app from '../../src/app';
import * as request from 'supertest';

let server, user, accessToken;
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
});
afterAll(async () => {
  if (server) {
    await server.close();
  }
  await getConnection().close();
});

describe('User test', () => {
  test('GET /user/:id, should return the correct user', async () => {
    // Save the dummy user directly
    await getRepository(User).save(user);
    const response = await request(server)
      .get(API_VERSION + '/user/1')
      .auth(accessToken, {
        type: 'bearer'
      })
      .expect(200);
    expect(response.body).toEqual({
      email: user.email,
      username: user.username,
      isAdmin: false
    });
  });
  test('PUT /user/password, should return OK', async () => {
    const response = await request(server)
      .put(API_VERSION + '/user/password')
      .auth(accessToken, {
        type: 'bearer'
      })
      .send({
        oldPassword: 'test',
        newPassword: 'changed'
      })
      .expect(200);
    expect(response.text).toEqual('OK');
  });
  test('PUT /user/password, wrong old password, should return Unauthorized', async () => {
    const response = await request(server)
      .put(API_VERSION + '/user/password')
      .auth(accessToken, {
        type: 'bearer'
      })
      .send({
        oldPassword: 'test',
        newPassword: 'wrong'
      })
      .expect(401);
    expect(response.text).toEqual('Current password is wrong');
  });
});
