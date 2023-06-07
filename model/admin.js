const sequelize=require('../database/connect')
const Sequelize=require('sequelize')


const admin =sequelize.define('admins',{
    id:{
        type:Sequelize.INTEGER,
        allownull:false,
        autoIncrement:true,
        primaryKey:true
    },
    
    amount:{
        type:Sequelize.STRING(500)
    },
    loantype:{
        type:Sequelize.STRING
    },
    intrest:{
        type:Sequelize.STRING
    },
    time:{
        type:Sequelize.DATE
    }
})

module.exports=admin