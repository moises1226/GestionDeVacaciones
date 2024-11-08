    import sq from "../config/conexion-db.js";
    import { DataTypes } from "sequelize";

    const Usuario = sq.define('usuario', {
        nombre: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        gmail: {   
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },  
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        antiguedad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        permisos: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: "usuario",
        timestamps: false,
    });

    export default Usuario;
