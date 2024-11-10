    import sq from "../config/conexion-db.js";
    import { DataTypes } from "sequelize";

    const Usuario = sq.define('Usuario', {
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
        tableName: "Usuario",
        timestamps: false,
    });

    export default Usuario;
