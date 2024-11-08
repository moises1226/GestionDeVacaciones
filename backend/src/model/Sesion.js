import { DataTypes } from 'sequelize';
import sq from '../config/conexion-db.js'; // Importa la conexión a la base de datos

const SesionGuardada = sq.define('sesion', {
  session_id: {
    type: DataTypes.STRING(255),
    primaryKey: true
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'sesion',  // Asegúrate de que la tabla se llama 'sesiones' en la base de datos
  timestamps: false,      // Desactivar los timestamps automáticos de Sequelize
});

export default SesionGuardada;
