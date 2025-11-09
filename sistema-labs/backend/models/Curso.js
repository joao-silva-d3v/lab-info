const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  instituicaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instituicao', required: true },
  nome: { type: String, required: true },
  turnos: [{ type: String }],
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Curso', cursoSchema);