import { SerializedErrorOutput } from '../types';

export abstract class BaseCustomError extends Error {
    protected abstract statusCode: number;
    protected abstract defaultErrorMessage: string;

    constructor(message?: string) {
        super();
    }

    abstract getStatusCode(): number;
    abstract serializeErrorOutput(): SerializedErrorOutput;
}
