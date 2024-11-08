import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

const Admin = sq.define('admin', {
    nombre: { 
        type: DataTypes.STRING,
        allowNull: false,  // Cambié a false para que sea obligatorio
    },
    gmail: {   
        type: DataTypes.STRING,
        allowNull: false,  // Cambié a false
    },  
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false,  // Cambié a false
    },
    permisos: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "admin",
    timestamps: false
});

export default Admin;
