const mongoose = require('mongoose');

const instituicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sigla: { type: String, required: true },
  cnpj: { type: String },
  endereco: { type: String },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Instituicao', instituicaoSchema);