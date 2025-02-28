const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const LinkConfig = require('./modelos/linkgenerate');
const SetupConfig = require('./modelos/setups');

// Iniciar mongodb
const mongoDB = require('./handlers/mongoDB');
mongoDB();  

function generateKey() {
  const segments = [
    'AT',
    Math.random().toString(36).substring(2, 7).toUpperCase(),
    Math.random().toString(36).substring(2, 7).toUpperCase(),
    Math.random().toString(36).substring(2, 7).toUpperCase()
  ];
  return segments.join('-');
}

function generateKey2() {
  const segments = [
    'AT',
    Math.random().toString(36).substring(2, 6).toUpperCase(),
    Math.random().toString(36).substring(2, 6).toUpperCase(),
    Math.random().toString(36).substring(2, 6).toUpperCase()
  ];
  return segments.join('-');
}
// Configuración de archivos estáticos
app.use('/zerver', express.static(path.join(__dirname, 'zerver')));
app.use(express.static(path.join(__dirname, 'zerver/protect/public')));

// Establecer EJS como motor de plantillas
app.set('view engine', 'ejs');

//Ruta 2
app.get('/will-we-love-you-forever', async (req, res) => {
  if (req.query.yes === 'we-love-you') {
    // Generar una clave aleatoria
    const key = generateKey2();

    // Los Guild IDs a los que se debe agregar la clave
    const guildIDs = ['1311143164035338332'];

    try {
      // Guardar la clave en la base de datos para esos guilds
      await Promise.all(guildIDs.map(async (guildID) => {
        await SetupConfig.updateOne(
          { guildID: guildID },
          { $push: { verifykey2: key } },  // Agregar la clave al arreglo verifykey
          { upsert: true }  // Si no existe el documento, lo crea
        );
      }));
      res.redirect(`/beloved-your?key=${key}&from=your-heart`);  // Redirige con la clave

    } catch (err) {
      console.error('Error guardando la clave en la base de datos:', err);
      res.status(500).send('Hubo un problema al guardar la clave.');
    }
  } else {
    const linkData = await LinkConfig.findOne(); 
    const link = linkData ? linkData.linkvip : '';
    res.render(path.join(__dirname, 'zerver/protect/public/html/index'), { link });
    console.log(link)
  }
});
// Ruta 1 
app.get('/do-we-love-you', async (req, res) => {
  // Mapeo de parámetros a Guild IDs
  const guildMap = {
    yes: '1244738279857717318',
    yess: '1311143164035338332',
    yesss: '1345148507694305280',
  };

  let keyGenerated = false;
  let redirectKey = '';

  for (const [param, guildID] of Object.entries(guildMap)) {
    if (req.query[param] === 'we-love-you') {
      const key = generateKey();
      keyGenerated = true;
      redirectKey = key; 

      try {
        await SetupConfig.updateOne(
          { guildID: guildID },
          { $push: { verifykey: key } },
          { upsert: true }
        );
      } catch (err) {
        console.error('Error guardando la clave en la base de datos:', err);
        return res.status(500).send('Hubo un problema al guardar la clave.');
      }
    }
  }

  if (keyGenerated) {
    return res.redirect(`/beloved-your?key=${redirectKey}`);
  } else {
    try {
      const linkData = await LinkConfig.findOne();
      const link = linkData ? linkData.link : '';
      return res.render(path.join(__dirname, 'zerver/protect/public/html/index'), { link });
    } catch (err) {
      console.error('Error obteniendo el link:', err);
      return res.status(500).send('Hubo un problema al obtener el enlace.');
    }
  }
});


app.get('/beloved-your', async (req, res) => {
  try {
    const linkData = await LinkConfig.findOne(); 
    const { key, from } = req.query;
    
    // Si el acceso viene desde verify2, usar linkvip; de lo contrario, usar link normal.
    const link = linkData ? (from === 'your-heart' ? linkData.linkvip : linkData.link) : '';

    res.render(path.join(__dirname, 'zerver/protect/vip/home/html/index'), { key, link });
  } catch (err) {
    console.error('Error al obtener la clave:', err);
    res.status(500).send('Error interno del servidor');
  }
});


// Global Route
app.get('*', async (req, res) => {
  try {
    const linkData = await LinkConfig.findOne(); 
    const link = linkData ? linkData.link : '';

    res.render(path.join(__dirname, 'zerver/protect/public/html/index'), { link });
  } catch (error) {
    console.error('Error al obtener el link:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Iniciar el servidor web
app.listen(PORT, () => {
  console.log(`Servidor web iniciado en http://localhost:${PORT}`);
});
