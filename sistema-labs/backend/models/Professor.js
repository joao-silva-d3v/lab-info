const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  emailInstitucional: { type: String, required: true },
  telefone: { type: String },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Professor', professorSchema);