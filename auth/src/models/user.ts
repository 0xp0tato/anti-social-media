import mongoose from 'mongoose';
import { DuplicatedEmail } from '../errors';
import { PasswordHash } from '../utils';

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

userSchema.pre('save', async function validateUniqueness(this: IUser, next) {
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser) {
        throw new DuplicatedEmail();
    }

    next();
});

userSchema.pre('save', async function hashPassword(this: IUser, next) {
    if (this.isModified('password')) {
        const hashedPassword = PasswordHash.toHashSync(this.password);
        this.set('password', hashedPassword);
    }
    next();
});

export const User = mongoose.model('User', userSchema);
