const config = require('../config/config.json')
const mongo = require('mongoose');

module.exports = client => {
    mongo.set('strictQuery', false);
    mongo.connect(config.mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
		console.log(`╔═════════════════════════════════════════════════════╗
║                                                     ║
║         Conectado correctamente a mongodb!          ║
║                                                     ║
╚═════════════════════════════════════════════════════╝`)
    }).catch(e => {
        console.log(`╔═════════════════════════════════════════════════════╗
        ║                                                     ║
        ║   Ah ocurrido un error al conectarse con mongodb!   ║
        ║                                                     ║
        ╚═════════════════════════════════════════════════════╝`)
	});
};
