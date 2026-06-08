const { Empresa } = require('../models');

const createEmpresa = async (req, res) => {
  try {
    const { nombre, ruc, direccion, rubro } = req.body;
    const empresa = await Empresa.create({ nombre, ruc, direccion, rubro });
    res.status(201).json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    res.json(empresas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) return res.status(404).json({ error: 'No existe' });
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) return res.status(404).json({ error: 'No existe' });
    await empresa.update(req.body);
    res.json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) return res.status(404).json({ error: 'No existe' });
    await empresa.destroy();
    res.json({ message: 'Eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEmpresa, getAll, getById, updateEmpresa, deleteEmpresa };