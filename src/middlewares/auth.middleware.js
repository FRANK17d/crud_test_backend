const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { getJwtSecret } = require('../config/jwt');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    const usuario = await Usuario.findByPk(payload.id, {
      attributes: ['id', 'nombre', 'email']
    });

    if (!usuario) return res.status(401).json({ error: 'Token invalido' });

    req.user = usuario;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalido o expirado' });
  }
};

module.exports = authenticate;
