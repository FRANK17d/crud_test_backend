const { Empresa, Empleado } = require('../models');

const getByEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.empresaId);
    if (!empresa) return res.status(404).json({ error: 'Empresa no existe' });

    const empleados = await Empleado.findAll({
      where: { empresaId: empresa.id },
      order: [['id', 'ASC']]
    });

    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, email, telefono } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const empresa = await Empresa.findByPk(req.params.empresaId);
    if (!empresa) return res.status(404).json({ error: 'Empresa no existe' });

    const empleado = await Empleado.create({
      nombre: nombre.trim(),
      cargo,
      email: email ? email.trim().toLowerCase() : null,
      telefono,
      empresaId: empresa.id
    });

    res.status(201).json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getByEmpresa, createEmpleado };
