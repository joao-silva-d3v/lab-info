const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  nome: { type: String, required: true },
  cargaHoraria: { type: Number, required: true },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);