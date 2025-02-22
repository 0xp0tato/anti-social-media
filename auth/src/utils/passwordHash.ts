import { scrypt, randomBytes, scryptSync } from 'crypto';

const PASSWORD_HASH_KEYLEN = 64;

export class PasswordHash {
    static toHashSync(password: string): string {
        const salt = randomBytes(16).toString('hex');
        const buffer = scryptSync(password, salt, PASSWORD_HASH_KEYLEN);
        return `${buffer.toString('hex')}.${salt}`;
    }

    static compareSync(hashedPassword: string, originalPassword: string): boolean {
        const [hash, salt] = hashedPassword.split('.');

        if (!salt) return false;

        const buffer = scryptSync(originalPassword, salt, PASSWORD_HASH_KEYLEN);

        return buffer.toString('hex') === hash;
    }
}
