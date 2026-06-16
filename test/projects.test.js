const request = require('supertest');
const app = require('../server'); 
const { initDb } = require('../config/database');

describe('Projects GET Endpoints', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('GET /projects - returns all projects', async () => {
    const res = await request(app).get('/projects');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('GET /projects/:id - returns single project', async () => {
    const listRes = await request(app).get('/projects');
    const firstItem = listRes.body[0]; 
    if (firstItem) {
      const res = await request(app).get(`/projects/${firstItem._id}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(firstItem.name);
    }
  });
});