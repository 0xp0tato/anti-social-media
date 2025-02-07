import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { APP_ROUTES } from '../constants';

const signUpRouter = express.Router();

signUpRouter.post(
  APP_ROUTES.SIGNUP_ROUTE,
  [
    body('email').isEmail().withMessage('Invalid email format'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).send({});
    }
    res.send({});
  }
);

export { signUpRouter };
