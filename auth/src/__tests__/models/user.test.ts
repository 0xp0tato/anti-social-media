import { User } from '../../models';

it('should not save a new user if already in db', async () => {
    const validUserInfo = {
        email: 'test@email.com',
        password: 'Password.1',
    };

    const newUser1 = await User.create(validUserInfo);
    expect(newUser1).toBeDefined();
    expect(newUser1.email).toEqual(validUserInfo.email);

    let errorMessage;
    try {
        await User.create(validUserInfo);
    } catch (e) {
        errorMessage = (e as Error).message;
    }

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toEqual('Email is already in the database');
});
