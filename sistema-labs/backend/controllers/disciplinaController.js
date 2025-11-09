const Disciplina = require('../models/Disciplina');
const { createCrudController } = require('./_crudControllerFactory');

const controller = createCrudController(Disciplina);

controller.getAll = async (req, res) => {
  try {
    const items = await Disciplina.find().populate('cursoId').populate('professorId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controller;