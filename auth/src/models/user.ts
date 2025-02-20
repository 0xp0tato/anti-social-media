import mongoose from 'mongoose';
import { DuplicatedEmail } from '../errors';

export type IUser = mongoose.Document & {
    email: string;
    password: string;
};

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.pre('save', async function preSaveFunction(this: IUser, next) {
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser) {
        throw new DuplicatedEmail();
    }

    next();
});

export const User = mongoose.model('User', userSchema);
