import session from 'express-session';

const sesion = session({
    secret: process.env.CLAVE_SECRETA, 
    saveUninitialized: true,  // Guarda las sesiones nuevas aunque no se modifiquen
    resave: false,            // No guarda la sesión si no ha sido modificada
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 día
        secure: false            // Si usas HTTPS, pon esto en true
    }
});

export default sesion;
