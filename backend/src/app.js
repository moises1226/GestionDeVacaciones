import express from 'express';
import morgan from 'morgan';
import ruta from "../src/ruta/rutasUsuario.js"


const app = express();


//congifuracion
app.set('port' , process.env.PORT || 3000);
app.set('json spaces', 2);


//middlewares

//routes
app.use('api/',ruta) ;


app.listen(app.get('port'), () => {
    console.log(`El sevidor funciona en el puerto ${app.get('port')}`);
});

