import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const jsonPath = path.join(__dirname, 'src', 'data', 'datos.json');


app.get('/api/empleados', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el archivo' });
    }
    res.json(JSON.parse(data));
  });
});


app.post('/api/empleados', (req, res) => {
  const nuevosEmpleados = req.body;
  
  fs.writeFile(jsonPath, JSON.stringify(nuevosEmpleados, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo escrivir en el archivo' });
    }
    res.json({ message: 'Los datos se guardaron chido en el archivo fisico' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});