import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

// Hash a password
export async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

// Compare a password with a hash
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}