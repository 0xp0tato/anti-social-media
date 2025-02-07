import request from 'supertest';
import { APP_ROUTES } from '../../constants';
import { app } from '../../app';

it('Should return 442 if email is not valid', async () => {
  await request(app).post(APP_ROUTES.SIGNUP_ROUTE).send({}).expect(422);

  await request(app)
    .post(APP_ROUTES.SIGNUP_ROUTE)
    .send({ email: 'asdasdasd' })
    .expect(422);
});
