import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

const Usuario = sq.define('Usuario' , {

    nombre : { 
        
        type : DataTypes.STRING,
        allowNull : true,
    
    },

    gmail : {   

        type : DataTypes.STRING,
        allowNull : true,
        unique : true

    },  

    contrasenia : {
        type : DataTypes.STRING,
        allowNull : true
    }},{
        tableName : "Usuario",
        timestamps : false
    });


    export default Usuario;