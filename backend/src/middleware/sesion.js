import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import sq from '../config/conexion-db.js';

// Obtiene SequelizeStore del objeto connectSessionSequelize
const SequelizeStore = connectSessionSequelize(session.Store);

// Clase extendida para usar 'upsert' en lugar de 'findCreateFind'
class CustomSequelizeStore extends SequelizeStore {
    async set(sid, sessionData, callback) {
        try {
            // Usamos upsert en lugar de findCreateFind
            await this.sessionModel.upsert({
                sid: sid,
                expires: sessionData.cookie.expires,
                data: JSON.stringify(sessionData),
            });
            callback && callback(null);
        } catch (err) {
            callback && callback(err);
        }
    }
}

// Middleware de sesión con almacenamiento en MySQL
const sesion = session({
    secret: process.env.CLAVE_SECRETA,
    saveUninitialized: true,
    resave: false,
    store: new CustomSequelizeStore({
        db: sq,
        table: 'Sesion',
        extendDefaultFields: (defaults, session) => {
            return {
                data: JSON.stringify(session),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            };
        }
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false, // true en producción con HTTPS
        httpOnly: true,
        sameSite: 'lax',
    }
});

export default sesion;
