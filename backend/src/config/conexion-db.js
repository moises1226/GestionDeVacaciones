import mysql from 'mysql2/promise';

async function connect() {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gestionVacaciones',
      });
      console.log('La conexion a mysql fue establecida');
      return connection;
    } catch (error) {
      console.error('fallo la conexion a la base de datos', error);
      throw error;
    }
  }
  
  export default connect;
