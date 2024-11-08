import sq from "../config/conexion-db.js"
import { DataTypes } from "sequelize"

const Admin = sq.define('Admin' , {

    nombre : { 
        
        type : DataTypes.STRING,
        allowNull : true,
    
    },

    gmail : {   

        type : DataTypes.STRING,
        allowNull : true

    },  

    contrasenia : {
        type : DataTypes.STRING,
        allowNull : true

    },

    permisos : {

        type : DataTypes.STRING,
        allowNull : false

    } },{
        tableName : "Admin",
        timestamps : false
    });


    export default Admin;