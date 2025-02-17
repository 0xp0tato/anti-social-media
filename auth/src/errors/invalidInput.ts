import { BaseCustomError } from './baseCustomError';

export class InvalidInput extends BaseCustomError {
    statusCode: number = 422;

    constructor() {
        super('User input does not match validation criteria');
    }

    getStatusCode(): number {
        return this.statusCode;
    }
    serializeErrorOutput() {
        throw new Error('Method not implemented.');
    }
}
