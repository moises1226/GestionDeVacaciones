import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

const formulario = sq.define('formulario' , {

    nombre : {
        type : DataTypes.STRING,
        allowNull : true
    },

    apellido : {
        type : DataTypes.STRING,
        allowNull : true
    },
    dni : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    gmail : {
        type : DataTypes.STRING,
        allowNull : true
    },
    fecha_inicio : {
        type : DataTypes.DATE,
        allowNull : true
    }
}, {

    tableName : "formulario",
    timestamps : false
});

export default formulario;