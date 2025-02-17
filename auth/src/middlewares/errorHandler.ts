import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { BaseCustomError } from '../errors';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BaseCustomError) res.sendStatus(err.getStatusCode());

    res.sendStatus(500);

    next();
};
