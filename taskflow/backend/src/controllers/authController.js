import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email is already registered' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ token: tokenFor(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) { res.status(500).json({ message: error.message }); }
}

export async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: tokenFor(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) { res.status(500).json({ message: error.message }); }
}

export function me(req, res) { res.json({ user: req.user }); }
