const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectAndSync } = require('./src/models');
const empresaRoutes = require('./src/routes/empresa.routes');
const authRoutes = require('./src/routes/auth.routes');
const authenticate = require('./src/middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/empresas', authenticate, empresaRoutes);

const PORT = process.env.PORT || 3000;

connectAndSync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server en ${PORT}`));
  })
  .catch((err) => {
    console.error('No se pudo iniciar el servidor', err);
    process.exit(1);
  });
