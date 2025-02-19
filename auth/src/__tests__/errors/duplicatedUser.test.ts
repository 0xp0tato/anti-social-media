import { DuplicatedEmail } from '../../errors';

describe('Test validity of duplicated user class', () => {
    it('should give status code of 422', () => {
        const duplicatedEmailError = new DuplicatedEmail();
        expect(duplicatedEmailError.getStatusCode()).toEqual(422);
    });

    it('should return errors in serialized format', () => {
        const duplicatedEmailError = new DuplicatedEmail();

        const serializedErrorOutput = duplicatedEmailError.serializeErrorOutput();
        expect(serializedErrorOutput.errors).toHaveLength(1);
        expect(serializedErrorOutput.errors[0].message).toEqual('The email already exists in the database');
    });
});
