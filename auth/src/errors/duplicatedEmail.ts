import { SerializedErrorOutput } from '../types';
import { BaseCustomError } from './baseCustomError';

export class DuplicatedEmail extends BaseCustomError {
    protected statusCode: number;
    protected defaultErrorMessage: string;

    constructor() {
        super('The email already exists in the database');
        this.statusCode = 422;
        this.defaultErrorMessage = 'The email already exists in the database';
    }

    getStatusCode(): number {
        return this.statusCode;
    }
    serializeErrorOutput(): SerializedErrorOutput {
        return {
            errors: [
                {
                    message: this.defaultErrorMessage,
                },
            ],
        };
    }
}
