const router=require('express').Router()
const regcontroller=require('../controller/registration')
const {check}=require('express-validator')
const {isEmpty}=require('validator')



router.get('/registration-page',regcontroller.registerPage)

router.post('/registration-page',[
    check('email').notEmpty().withMessage('Your email is required'),
    check('password').notEmpty().trim()

],regcontroller.registerPost)

router.get('/login-page',regcontroller.loginPage)
router.post('/login-page',regcontroller.postLogin)

router.get('/otp-page',regcontroller.confirmPage)
router.post('/otp-page',regcontroller.otpPage)

router.get('/bank-details',regcontroller.bankDetails)
router.post('/bank-details',regcontroller.bankCollect)

router.get('/forgot-password',regcontroller.forgotPassword)
router.post('/forgot-password',regcontroller.postForgot)

// router.get('/retrive-password/:token',regcontroller.retrivePassword)







module.exports=router