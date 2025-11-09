const Bloco = require('../models/Bloco');
const { createCrudController } = require('./_crudControllerFactory');

module.exports = createCrudController(Bloco);