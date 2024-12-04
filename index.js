const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const SetupConfig = require('./modelos/setups');

//Iniciar mongodb
const mongoDB = require('./handlers/mongoDB');
mongoDB();  

function generateKey() {
  const segments = [
    'AT',
    Math.random().toString(36).substring(2, 7).toUpperCase(),
    Math.random().toString(36).substring(2, 7).toUpperCase(),
    Math.random().toString(36).substring(2, 7).toUpperCase(),
    Math.random().toString(36).substring(2, 7).toUpperCase()
  ];
  return segments.join('-');
}

// Configuración de archivos estáticos
app.use('/zerver', express.static(path.join(__dirname, 'zerver')));
app.use(express.static(path.join(__dirname, 'zerver/protect/public')));

// Establecer EJS como motor de plantillas
app.set('view engine', 'ejs');

// Ruta con parámetro de verificación
app.get('/@%23123!%24%25-vip-access/%3A%3A%3F%3F%26%26--%5B%5BHome%5D%5D%3D%3D%2B%3D/route_ultimate-%5E~', async (req, res) => {
  if (req.query.sairnfd === '?jf=?jfsnfddf') {
    // Generar una clave aleatoria
    const key = generateKey();

    // Los Guild IDs a los que se debe agregar la clave
    const guildIDs = ['1311143164035338332', '1244738279857717318'];

    try {
      // Guardar la clave en la base de datos para esos guilds
      await Promise.all(guildIDs.map(async (guildID) => {
        await SetupConfig.updateOne(
          { guildID: guildID },
          { $push: { verifykey: key } },  // Agregar la clave al arreglo verifykey
          { upsert: true }  // Si no existe el documento, lo crea
        );
      }));

      // Mostrar la página con la clave generada
      res.render(path.join(__dirname, 'zerver/protect/vip/home/html/index'), { key });
    } catch (err) {
      console.error('Error guardando la clave en la base de datos:', err);
      res.status(500).send('Hubo un problema al guardar la clave.');
    }
  } else {
    res.sendFile(path.join(__dirname, 'zerver/protect/public/html/index.html'));
  }
});

// Ruta genérica
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'zerver/protect/public/html/index.html'));
});

// Iniciar el servidor web
app.listen(PORT, () => {
  console.log(`Servidor web iniciado en http://localhost:${PORT}`);
});

