const Professor = require('../models/Professor');
const { createCrudController } = require('./_crudControllerFactory');

module.exports = createCrudController(Professor);