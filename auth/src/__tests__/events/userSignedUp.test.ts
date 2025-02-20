import { UserSignedUp } from '../../events/userSignedUp';
import { User } from '../../models';

describe('', () => {
    it('should expose the id and the email when serializing to REST', async () => {
        const newUser = await User.create({
            email: 'test@email.com',
            password: 'Password.1',
        });

        const userSignedUpEvent = new UserSignedUp(newUser);
        const serializedResponse = userSignedUpEvent.serializeRest();

        expect(Object.keys(serializedResponse).sort()).toEqual(['id', 'email'].sort());
        expect(serializedResponse.email).toEqual('test@email.com');
        expect(userSignedUpEvent.getStatusCode()).toEqual(201);
    });
});
