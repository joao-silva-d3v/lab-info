const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/instituicoes', require('./routes/instituicaoRoutes'));
app.use('/api/cursos', require('./routes/cursoRoutes'));
app.use('/api/professores', require('./routes/professorRoutes'));
app.use('/api/disciplinas', require('./routes/disciplinaRoutes'));
app.use('/api/laboratorios', require('./routes/laboratorioRoutes'));
app.use('/api/blocos', require('./routes/blocoRoutes'));
app.use('/api/aulas', require('./routes/aulaRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));