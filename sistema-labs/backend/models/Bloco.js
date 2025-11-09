const mongoose = require('mongoose');

const blocoSchema = new mongoose.Schema({
  turno: { type: String, required: true },
  diaSemana: { type: String, required: true },
  inicio: { type: String, required: true },
  fim: { type: String, required: true },
  ordem: { type: Number, required: true }
});

module.exports = mongoose.model('Bloco', blocoSchema);