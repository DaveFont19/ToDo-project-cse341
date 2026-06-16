const request = require('supertest');
const app = require('../server'); 
const { initDb } = require('../config/database');

describe('Tasks GET Endpoints', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('GET /tasks - returns all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('GET /tasks/:id - returns single task', async () => {
    const listRes = await request(app).get('/tasks');
    const firstItem = listRes.body[0]; 
    if (firstItem) {
      const res = await request(app).get(`/tasks/${firstItem._id}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(firstItem.title);
    }
  });
});