const sequelize = require('../database/connect')
const Sequelize=require('sequelize')

const user= sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    legalname:{
        type:Sequelize.STRING,

    },
    ssn:{
        type:Sequelize.INTEGER

    },
    nin:{
        type:Sequelize.INTEGER
    },
    image:{
        type:Sequelize.STRING
    }


    
})






module.exports=user