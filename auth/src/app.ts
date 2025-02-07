import express, { Express, Request, Response } from 'express';
import { signUpRouter } from './routes';
import { json } from 'body-parser';

const app: Express = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('This is home');
});

app.use(signUpRouter);

export { app };
