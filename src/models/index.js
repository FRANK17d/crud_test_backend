const sequelize = require('../config/db');
const Empresa = require('./empresa.model');

const connectAndSync = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB conectado');
    await sequelize.sync(); // en dev: { force: true } para resetear
    console.log('Modelos sincronizados');
  } catch (err) {
    console.error('Error DB', err);
    throw err;
  }
};

module.exports = { sequelize, Empresa, connectAndSync };
