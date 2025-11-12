import { poolPromise } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
  console.log('Register request body:', req.body);
  const { email, password, fullName, role = 'donor' } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const pool = await poolPromise;

    // Verificar si el usuario ya existe
    const existingUser = await pool
      .request()
      .input('email', email)
      .query('SELECT id FROM users WHERE email = @email');

    if (existingUser.recordset.length > 0)
      return res.status(400).json({ message: 'User already exists' });

    const hashed = await hashPassword(password);
    const newId = uuidv4();

    await pool
      .request()
      .input('id', newId)
      .input('email', email)
      .input('password', hashed)
      .input('fullName', fullName)
      .input('role', role)
      .query(`
        INSERT INTO users (id, email, password_hash, full_name, role)
        VALUES (@id, @email, @password, @fullName, @role)
      `);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT id, password_hash, role FROM users WHERE email = @email');

    if (result.recordset.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.recordset[0];
    const match = await comparePassword(password, user.password_hash);

    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
