import { Request, Response } from 'express';

export const handleMethodNotAllowed = (req: Request, res: Response): void => {
  res.status(405).send({});
};
