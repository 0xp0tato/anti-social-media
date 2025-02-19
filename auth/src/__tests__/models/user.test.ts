import { BaseCustomError, DuplicatedEmail } from '../../errors';
import { User } from '../../models';

it('should not save a new user if already in db', async () => {
    const validUserInfo = {
        email: 'test@email.com',
        password: 'Password.1',
    };

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
