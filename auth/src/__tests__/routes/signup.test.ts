import request from 'supertest';
import { APP_ROUTES } from '../../constants';
import { app } from '../../app';

/**
 * Email Validity
 *  - must follow the email regex
 */
describe('Test validity of email input', () => {
  let password: string;

  beforeAll(() => {
    password = 'Password.1';
  });

  it('Should return 442 if email is not provided', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ password })
      .expect(422);
  });

  it('Should return 442 if email is not valid', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email: 'asdasdasd', password })
      .expect(422);
  });

  it('Should return 200 if email is valid', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email: 'test@email.com', password })
      .expect(200);
  });
});

/**
 * Password Validity
 *  - must not be null
 *  - must be atleast 8 characters long
 *  - must have atleast 1 lowercase letter
 *  - must have atleast 1 uppercase letter
 *  - must have atleast 1 number
 *  - must have atleast 1 special character
 */
describe('Test validity of password input', () => {
  let email: string;

  beforeAll(() => {
    email = 'test@email.com';
  });

  it('Should return 442 if no password is provided', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email })
      .expect(422);
  });

  it('Should return 442 if password length is less than 8 characters', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'Pass.1' })
      .expect(422);
  });

  it('Should return 442 if password has no lowercase letter', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'PASSWORD.1' })
      .expect(422);
  });

  it('Should return 442 if password has no uppercase letter', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'password.1' })
      .expect(422);
  });

  it('Should return 442 if password has no number', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'Password.' })
      .expect(422);
  });

  it('Should return 442 if password has no special character', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'Password1' })
      .expect(422);
  });

  it('Should return 200 if password is valid', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password: 'Password.1' })
      .expect(200);
  });
});

/**
 * Methods available for signup api
 *  - POST
 *  - OPTIONS
 *
 * Methods not available for signup api
 *  - GET
 *  - PUT
 *  - PATCH
 *  - DELETE
 */

describe('Test signup route method availability', () => {
  let email: string;
  let password: string;

  beforeAll(() => {
    email = 'test@email.com';
    password = 'Password.1';
  });

  it('Should return 405 for GET request', async () => {
    await request(app)
      .get(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
  });

  it('Should return 405 for PUT request', async () => {
    await request(app)
      .put(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
  });

  it('Should return 405 for PATCH request', async () => {
    await request(app)
      .patch(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
  });

  it('Should return 405 for DELETE request', async () => {
    await request(app)
      .delete(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
  });

  it('Should return 200 for POST requests', async () => {
    await request(app)
      .post(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(200);
  });

  it('Should return 200 for OPTION request', async () => {
    await request(app)
      .options(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(200);
  });

  it('Should return available method options for OPTION request', async () => {
    const response = await request(app)
      .options(APP_ROUTES.SIGNUP_ROUTE)
      .send({ email, password })
      .expect(200);

    expect(response.get('access-control-allow-methods')).toContain('POST');
    expect(response.get('access-control-allow-methods')).toContain('OPTIONS');
  });
});
