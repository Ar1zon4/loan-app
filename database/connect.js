const Sequelize=require('sequelize')

const sequelize= new Sequelize('loan_app',"root",'Bafoo2019*',{
    host:'localhost',
    dialect:'mysql'
})


module.exports=sequelize