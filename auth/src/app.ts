import 'express-async-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { signUpRouter } from './routes';
import { json } from 'body-parser';
import { errorHandler } from './middlewares';

const app: Express = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('This is home');
});

app.use(signUpRouter);
app.use(errorHandler);

export { app };
