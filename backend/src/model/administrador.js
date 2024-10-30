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
    }},{
        tableName : "Admin",
        timestamps : false
    });5


    export default Admin;