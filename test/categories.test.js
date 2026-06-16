const request = require('supertest');
const app = require('../server'); 
const { initDb } = require('../config/database');

describe('Categories GET Endpoints', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('GET /categories - returns all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('GET /categories/:id - returns single category', async () => {
    const listRes = await request(app).get('/categories');
    const firstItem = listRes.body[0]; 
    if (firstItem) {
      const res = await request(app).get(`/categories/${firstItem._id}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(firstItem.name);
    }
  });
});