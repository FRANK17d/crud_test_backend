const sequelize = require('../config/db');
const Empresa = require('./empresa.model');
const Usuario = require('./usuario.model');
const Empleado = require('./empleado.model');

Empresa.hasMany(Empleado, {
  foreignKey: 'empresaId',
  as: 'empleados',
  onDelete: 'CASCADE'
});

Empleado.belongsTo(Empresa, {
  foreignKey: 'empresaId',
  as: 'empresa'
});

const connectAndSync = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB conectado');
    await sequelize.sync();
    console.log('Modelos sincronizados');
  } catch (err) {
    console.error('Error DB', err);
    throw err;
  }
};

module.exports = { sequelize, Empresa, Usuario, Empleado, connectAndSync };
