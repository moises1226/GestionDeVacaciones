import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

const Usuario = sq.define('Usuario' , {

    nombre : { 
        
        type : DataTypes.STRING,
        allowNull : false,
    
    },

    gmail : {   

        type : DataTypes.STRING,
        allowNull : true

    },  

    contrasenia : {
        type : DataTypes.STRING,
        allowNull : true
    }},{
        tableName : "Usuario",
        timestamps : false
    });


    export default Usuario;