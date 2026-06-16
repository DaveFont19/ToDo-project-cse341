const request = require('supertest');
const app = require('../server'); 
const { initDb } = require('../config/database');

describe('Users GET Endpoints', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('GET /users - returns all users', async () => {
    const res = await request(app).get('/users');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('GET /users/:id - returns single user', async () => {
    const listRes = await request(app).get('/users');
    const firstItem = listRes.body[0]; 
    if (firstItem) {
      const res = await request(app).get(`/users/${firstItem._id}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(firstItem.email);
    }
  });
});