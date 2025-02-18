import { FieldValidationError, ValidationError } from 'express-validator';
import { BaseCustomError } from './baseCustomError';
import { SerializedErrorField, SerializedErrorOutput } from '../types';

export type InvalidInputConstructorErrorsParams = ValidationError[];
export class InvalidInput extends BaseCustomError {
    protected defaultErrorMessage: string;
    protected statusCode: number;
    protected errors: InvalidInputConstructorErrorsParams | undefined;

    constructor(errors?: InvalidInputConstructorErrorsParams) {
        super('User input does not match validation criteria');
        this.errors = errors;
        this.statusCode = 422;
        this.defaultErrorMessage =
            'User input does not match validation criteria';
    }

    private parseValidationErrors(): SerializedErrorOutput {
        const parsedErrors: SerializedErrorField = {};

        if (this.errors && this.errors.length > 0) {
            this.errors.forEach((error) => {
                if (error.type === 'field') {
                    if (parsedErrors[error.path]) {
                        parsedErrors[error.path].push(error.msg);
                    } else {
                        parsedErrors[error.path] = [error.msg];
                    }
                }
            });
        }

        return {
            errors: [
                {
                    message: this.defaultErrorMessage,
                    fields: parsedErrors,
                },
            ],
        };
    }

    getStatusCode(): number {
        return this.statusCode;
    }
    serializeErrorOutput(): SerializedErrorOutput {
        return this.parseValidationErrors();
    }
}
