import { getRepository, getConnection } from 'typeorm';
import { User } from '../../src/entity/User';
import { validatePassword } from '../../src/util/authUtils';
import * as app from '../../src/app';
import * as request from 'supertest';
let server;
beforeAll(async () => {
  server = await app.startServer();
});
afterAll(async () => {
  if (server) {
    await server.close();
  }
  await getConnection().close();
});
const email = 'test@edtech.com';
const password = 'test';
const username = 'Bob';
const API_VERSION = process.env.API_VERSION;

describe('Registration and Login test', () => {
  test('POST /register, should register a user to db', async () => {
    await request(server)
      .post(API_VERSION + '/register')
      .send({
        email: email,
        password: password,
        username: username
      })
      .expect(200);
    const user = await getRepository(User).findOne({ email: email });
    expect(user).toBeTruthy();
    expect(user.email).toEqual(email);
    expect(user.username).toEqual(username);
    expect(await validatePassword(password, user.passwordHash)).toBe(true);
  });
  test('POST /login, should get a correct response with jwt', async () => {
    const response = await request(server)
      .post(API_VERSION + '/login')
      .send({
        email: email,
        password: password
      })
      .expect(200);
    expect(response.body).toHaveProperty('token');
  });
});
