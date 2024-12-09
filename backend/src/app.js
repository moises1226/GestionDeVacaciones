    import express from 'express';
    import morgan from 'morgan';
    import ruta from "../src/rutas/rutasCompletas.js";
    import { corsMiddleware } from "./middleware/cors.js";
   

    const app = express();

    // Configuración
    app.use(corsMiddleware());
    app.set('port', process.env.PORT || 3000);
    app.set('json spaces', 2);

    // Middlewares
    app.use(express.json());
    app.use(morgan('dev')); 

    // Rutas
    app.use('/api', ruta);
    app.listen(app.get('port'), () => {
        console.log(`El servidor funciona en el puerto ${app.get('port')}`);
    });
