const Laboratorio = require('../models/Laboratorio');
const { createCrudController } = require('./_crudControllerFactory');

module.exports = createCrudController(Laboratorio);