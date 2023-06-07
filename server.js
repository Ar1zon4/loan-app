const express = require('express')
const path=require('path')
const PORT= 4000
const flash=require('connect-flash')
const sequelize=require('./database/connect')
const regRoute=require('./routes/registration')
const adminRoute=require('./routes/admin')
const userRoute=require('./routes/user')
const bodyparser=require('body-parser')
const session=require('express-session')
const pageRoute = require('./routes/page')
const multer=require('multer')


const registration=require('./model/auth')
const Session=require('./model/session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bankDetails=require('./model/bankdetail')
const user=require('./model/user')



const app=express()
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
      }),
    cookie:{}
}))

app.use((req,res,next)=>{
    res.locals.isLoggedIn=req.session.isLoggedIn
    res.locals.register=req.session.register
    
    next()
})
app.use(pageRoute)
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        console.log(req.body)
        let extention=file.mimetype.split('/')[1];
        console.log(extention)
        cb(null,Date.now()+"-"+req.body.title+'.'+extention)

    }
})
app.use(multer({storage:storage}).single('image'))

app.set('view engine','ejs')



sequelize.sync()
app.use(flash())

app.use(regRoute)
app.use(adminRoute)
app.use(userRoute)


app.listen(PORT,user=>{
    console.log('loan app')
})
