const sequelize = require('../database/connect')
const Sequelize=require('sequelize')


const bankdetails=sequelize.define('bankdetails',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    bankname:{
        type:Sequelize.STRING,

    },
    accountnumber:{
        type:Sequelize.STRING
    },
    accounttype:{
     type:Sequelize.STRING
    },
    cvv:{
    type:Sequelize.INTEGER
    }
   

})


module.exports=bankdetails