import express from 'express';
const app = express();
import morgan from 'morgan';
import routes from './routes/index.js'

//congifuracion
app.set('port' , process.env.PORT || 3000);
app.set('json spaces', 2);


//middlewares

//routes
app.use(routes) ;


app.listen(app.get('port'), () => {
    console.log(`El sevidor funciona en el puerto ${app.get('port')}`);
});

