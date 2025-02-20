import { IUser } from '../models';
import { BaseAuthEvent } from './baseAuthEvent';

export type UserSignedUpRestPayload = {
    id: string;
    email: string;
};

export class UserSignedUp extends BaseAuthEvent<UserSignedUpRestPayload> {
    protected statusCode: number;
    private user: IUser;

    constructor(user: IUser) {
        super();
        this.user = user;
        this.statusCode = 201;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    serializeRest(): UserSignedUpRestPayload {
        return {
            id: this.user.id,
            email: this.user.email,
        };
    }
}
