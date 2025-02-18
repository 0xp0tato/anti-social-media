import {
    InvalidInput,
    InvalidInputConstructorErrorsParams,
} from '../../errors';

describe('Test validity of InvalidInput error class', () => {
    it('should have status code of 422', () => {
        const invalidInput = new InvalidInput();
        expect(invalidInput.getStatusCode()).toEqual(422);
    });

    it('should return error in serialized format', () => {
        const errors: InvalidInputConstructorErrorsParams = [
            {
                type: 'field',
                value: 'Password.',
                msg: 'Invalid password format. Password must have atleast 8 characters, atleast 1 lowercase letter, atleast 1 uppercase letter, atleast 1 number and atleast 1 symbol',
                path: 'password',
                location: 'body',
            },
        ];

        const invalidInputError = new InvalidInput(errors);
        const serializedErrors = invalidInputError.serializeErrorOutput();

        expect(serializedErrors.errors).toHaveLength(1);

        const { fields = {} } = serializedErrors.errors[0];

        expect(serializedErrors.errors[0].message).toEqual(
            'User input does not match validation criteria'
        );

        expect(Object.keys(fields)).toEqual(['password']);
        expect(fields.password).toHaveLength(1);
        expect(fields.password).toContain(
            'Invalid password format. Password must have atleast 8 characters, atleast 1 lowercase letter, atleast 1 uppercase letter, atleast 1 number and atleast 1 symbol'
        );
    });
});
