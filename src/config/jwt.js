const getJwtSecret = () => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET no configurado');
  }

  return 'dev_jwt_secret_change_me';
};

module.exports = { getJwtSecret };
