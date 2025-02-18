import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { APP_ROUTES } from '../constants';
import { handleMethodNotAllowed } from '../utils';
import { User } from '../models';
import { InvalidInput } from '../errors';

const signUpRouter = express.Router();

signUpRouter.post(
    APP_ROUTES.SIGNUP_ROUTE,
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Invalid email format'),
        body('password')
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage(
                'Invalid password format. Password must have atleast 8 characters, atleast 1 lowercase letter, atleast 1 uppercase letter, atleast 1 number and atleast 1 symbol'
            ),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw new InvalidInput();

        const { email, password } = req.body;

        try {
            const newUser = await User.create({ email, password });
            res.status(201).send({ email: newUser.email });
        } catch (error) {
            res.sendStatus(422);
        }
    }
);

signUpRouter.options(APP_ROUTES.SIGNUP_ROUTE, (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );

    res.sendStatus(200);
});

signUpRouter.get(APP_ROUTES.SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.put(APP_ROUTES.SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.patch(APP_ROUTES.SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.delete(APP_ROUTES.SIGNUP_ROUTE, handleMethodNotAllowed);

export { signUpRouter };
