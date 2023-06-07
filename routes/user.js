const router=require('express').Router()
const { loansAvaliable } = require('../controller/admin/admin')
const userController=require('../controller/user/user')

router.get('/user-dashboard',userController.userDashboard)
router.get('/loan-avaliable',userController.usersLoan)

router.get('/user-id',userController.postId)

router.get('/verifiy-page',userController.verifyPage)
router.post('/verifiy-page',userController.postVerify)

router.get('/verified',userController.verifiedPage)

router.get('/approval-page',userController.approvalPage)



module.exports=router