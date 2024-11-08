import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';  // Usar import por defecto
import sq from '../config/conexion-db.js';  // Tu conexión a la base de datos

// Crear SequelizeStore correctamente
const SequelizeStore = connectSessionSequelize(session); // Instancia de SequelizeStore

// Middleware de sesión con almacenamiento en MySQL
const sesion = session({
    secret: process.env.CLAVE_SECRETA,  // Clave secreta para firmar la sesión
    saveUninitialized: true,           // Guarda sesiones sin modificar
    resave: false,                     // No vuelve a guardar la sesión si no ha sido modificada
    store: new SequelizeStore({  // Aquí estamos usando 'new' para crear la instancia correctamente
        db: sq,                         // Conexión a la base de datos
        table: 'Sesion',                 // Nombre correcto de la tabla para almacenar las sesiones
        extendDefaultFields: (defaults, session) => {
            return {
                data: JSON.stringify(session),  // Almacena la sesión como JSON
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Expira en 1 día
            };
        }
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,  // La sesión dura 1 día
        secure: false, // Solo en producción (HTTPS)
        httpOnly: true,                // Impide el acceso a la cookie desde el cliente
        sameSite: 'strict',            // Política de cookies para evitar ataques CSRF
    }
});

export default sesion;
