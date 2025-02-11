import request from 'supertest';
import { app } from '../app';
import { APP_ROUTES } from '../constants';
import { User } from '../models';

describe('Database functionality testing', () => {
    const validUserInfo = {
        email: 'test@email.com',
        password: 'Password.1',
    };

    it('Should save the user successfully', async () => {
        const response = await request(app)
            .post(APP_ROUTES.SIGNUP_ROUTE)
            .send(validUserInfo)
            .expect(201);

        const user = await User.findOne({ email: response.body.email });
        const userEmail = user ? user.email : '';

        expect(user).toBeDefined();
        expect(userEmail).toEqual(validUserInfo.email);
    });

    it('Does not allow duplicate emails', async () => {
        await request(app)
            .post(APP_ROUTES.SIGNUP_ROUTE)
            .send(validUserInfo)
            .expect(201);

        await request(app)
            .post(APP_ROUTES.SIGNUP_ROUTE)
            .send(validUserInfo)
            .expect(422);
    });
});
