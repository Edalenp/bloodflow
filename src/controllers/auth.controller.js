import { poolPromise } from '../database/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateAcessToken, generateRefreshToken } from '../utils/jwt.js';
import {  v4 as uuidv4 } from 'uuid';

export const register = async (req, req) => {
    const { email, password, role = 'donor' } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Email and password required' });
}