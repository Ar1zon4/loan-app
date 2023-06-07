const adminController=require('../controller/admin/admin')
const router = require('./registration')




router.get('/dashboard-page',adminController.dashBoard)

router.get('/new-loan',adminController.postLoan)
router.post('/new-loan',adminController.addLoan)

router.get('/home-page',adminController.homePage)

router.get('/avaliable-loans',adminController.loansAvaliable)


router.get('/verifiy-loan',adminController.verifiyLoan)

router.get('/update-loan/:id',adminController.updateLoan)
router.post('/update-loan',adminController.getUpdate)

router.post('/delete-loan',adminController.deleteLoan)

router.post('/delete-prop',adminController.deleteProp)







module.exports=router