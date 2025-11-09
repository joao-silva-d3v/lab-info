const Instituicao = require('../models/Instituicao');
const { createCrudController } = require('./_crudControllerFactory');

module.exports = createCrudController(Instituicao);