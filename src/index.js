const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

const aulaRoutes = require('./routes/aulaRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/aulas', aulaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sistema de Academia rodando na porta ${PORT}`);
});