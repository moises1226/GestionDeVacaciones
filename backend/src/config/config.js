import dotenv from "dotenv";


dotenv.config();

export default {
    local: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
};