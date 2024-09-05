import request from 'supertest';

import { APP_URL } from '../utils/constants';

describe('ArticlesController (e2e)', () => {
  const app = APP_URL;
  const newUserFirstName = `Tester${Date.now()}`;
  const newUserLastName = `E2E`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;
  let apiToken: string;

  beforeAll(async () => {
    await request(app).post('/api/v1/auth/email/register').send({
      email: newUserEmail,
      password: newUserPassword,
      firstName: newUserFirstName,
      lastName: newUserLastName,
    });
    apiToken = (
      await request(app).post('/api/v1/auth/email/login').send({
        email: newUserEmail,
        password: newUserPassword,
      })
    ).body.token;
  });

  afterAll(async () => {});

  it('should return paginated articles', async () => {
    const response = await request(app)
      .get('/api/v1/articles/web')
      .query({ page: 1, limit: 5 })
      .set('Authorization', 'Bearer ' + apiToken)
      .expect(200);

    // Check the response structure
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('hasNextPage');
    expect(response.body).toHaveProperty('totalRecords');
    expect(response.body).toHaveProperty('pageNumber');
    expect(response.body).toHaveProperty('pageLimit');
    expect(response.body).toHaveProperty('from');
    expect(response.body).toHaveProperty('to');

    // Check pagination correctness
    expect(response.body.data.length).toBeLessThanOrEqual(5);
    expect(response.body.pageNumber).toBe(1);
    expect(response.body.pageLimit).toBe(5);
    expect(response.body.from).toBe(1);
  });
});
