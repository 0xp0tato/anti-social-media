import { randomBytes } from 'crypto';
import { BaseCustomError, DuplicatedEmail } from '../../errors';
import { User } from '../../models';
import { PasswordHash } from '../../utils';

describe('Test the user model', () => {
    const validUserInfo = {
        email: 'test@email.com',
        password: 'Password.1',
    };

    it('should not save a new user if already in db', async () => {
        const newUser1 = await User.create(validUserInfo);
        expect(newUser1).toBeDefined();
        expect(newUser1.email).toEqual(validUserInfo.email);

        let err: DuplicatedEmail | undefined;
        try {
            await User.create(validUserInfo);
        } catch (e: any) {
            err = e;
        }

        const serializedErrorOutput = err ? err.serializeErrorOutput() : undefined;

        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(BaseCustomError);
        expect(serializedErrorOutput).toBeDefined();
        expect(serializedErrorOutput?.errors[0].message).toEqual('The email already exists in the database');
    });

    it('should encrypt the password when creating the user', async () => {
        const newUser = await User.create(validUserInfo);

        expect(newUser.password).not.toEqual(validUserInfo.password);
        expect(newUser.password.split('.')).toHaveLength(2);
        expect(newUser.password.split('.')[1].length).toEqual(randomBytes(16).toString('hex').length);
    });

    it('should return true when comparing hashed password with original password', async () => {
        const newUser = await User.create(validUserInfo);

        expect(PasswordHash.compareSync('1234', validUserInfo.password)).toEqual(false);
        expect(PasswordHash.compareSync('1234.1234', validUserInfo.password)).toEqual(false);
        expect(PasswordHash.compareSync(newUser.password, validUserInfo.password)).toEqual(true);
    });
});
