const Aula = require('../models/Aula');
const { createCrudController } = require('./_crudControllerFactory');

const controller = createCrudController(Aula);

controller.getAll = async (req, res) => {
  try {
    const items = await Aula.find()
      .populate('disciplinaId')
      .populate('professorId')
      .populate('laboratorioId')
      .populate('blocos')
      .populate('cursoId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controller.create = async (req, res) => {
  try {
    // Conflito de Laboratório
    const labConflict = await Aula.findOne({
      semestre: req.body.semestre,
      laboratorioId: req.body.laboratorioId,
      diaSemana: req.body.diaSemana,
      blocos: { $in: req.body.blocos }
    });
    
    if (labConflict) {
      return res.status(409).json({ msg: "Conflito de Laboratório..." });
    }

    // Conflito de Professor
    const profConflict = await Aula.findOne({
      semestre: req.body.semestre,
      professorId: req.body.professorId,
      diaSemana: req.body.diaSemana,
      blocos: { $in: req.body.blocos }
    });
    
    if (profConflict) {
      return res.status(409).json({ msg: "Conflito de Professor..." });
    }

    const item = new Aula(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.delete = async (req, res) => {
  try {
    const item = await Aula.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controller;