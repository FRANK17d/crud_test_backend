const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/empresa.controller');

router.post('/', ctrl.createEmpresa);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.updateEmpresa);
router.delete('/:id', ctrl.deleteEmpresa);

module.exports = router;