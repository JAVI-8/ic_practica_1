const express = require('express');
const app = express();

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
