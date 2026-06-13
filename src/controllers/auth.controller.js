const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { getJwtSecret } = require('../config/jwt');

const publicUser = (usuario) => ({
  id: usuario.id,
  nombre: usuario.nombre,
  email: usuario.email
});

const createToken = (usuario) => jwt.sign(
  { id: usuario.id, email: usuario.email },
  getJwtSecret(),
  { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
);

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y password son obligatorios' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'El password debe tener al menos 8 caracteres' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await Usuario.findOne({ where: { email: normalizedEmail } });
    if (exists) {
      return res.status(409).json({ error: 'El email ya esta registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({ usuario: publicUser(usuario) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son obligatorios' });
    }

    const usuario = await Usuario.findOne({ where: { email: email.trim().toLowerCase() } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    res.json({ token: createToken(usuario), usuario: publicUser(usuario) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
