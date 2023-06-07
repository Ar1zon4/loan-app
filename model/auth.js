const sequelize = require('../database/connect')
const Sequelize=require('sequelize')


const registration=sequelize.define('registrations',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true

    },
    password:{
        type:Sequelize.STRING
    },
    bvn:{
    type:Sequelize.INTEGER(100)
    },
    otp:{
        type:Sequelize.STRING
    }

})





module.exports=registration