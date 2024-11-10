import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

//modelo de administrador
const Administrador = sq.define('Administrador', {
    nombre: { 
        type: DataTypes.STRING,
        allowNull: false,  
    },
    gmail: {   
        type: DataTypes.STRING,
        allowNull: false,  
    },  
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    permisos: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Administrador",
    timestamps: false
});

export default Administrador;
