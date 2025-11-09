const mongoose = require('mongoose');

const laboratorioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  capacidade: { type: Number, required: true },
  localizacao: { type: String },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Laboratorio', laboratorioSchema);