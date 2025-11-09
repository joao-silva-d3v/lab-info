const Curso = require('../models/Curso');
const { createCrudController } = require('./_crudControllerFactory');

const controller = createCrudController(Curso);

controller.getAll = async (req, res) => {
  try {
    const items = await Curso.find().populate('instituicaoId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controller;