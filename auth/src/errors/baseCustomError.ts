import { SerializedErrorOutput } from '../types';

export abstract class BaseCustomError extends Error {
    protected abstract statusCode: number;
    constructor(message?: string) {
        super();
    }

    abstract getStatusCode(): number;
    abstract serializeErrorOutput(): SerializedErrorOutput;
}
