import express from 'express';
import morgan from 'morgan';
import ruta from "./rutas/rutasUsuario.js";
import {corsMiddleware}from "./middleware/cors.js";
const app = express();

// Configuración
app.use(corsMiddleware());
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


// Middlewares
app.use(express.json()); // Agrega este middleware para procesar JSON
app.use(morgan('dev')); // Si deseas tener logs de las solicitudes

// Rutas
app.use('/api', ruta); // Asegúrate de que tus rutas estén prefijadas correctamente

app.listen(app.get('port'), () => {
    console.log(`El servidor funciona en el puerto ${app.get('port')}`);
});