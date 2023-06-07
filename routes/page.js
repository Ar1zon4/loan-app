const router =require('express').Router()
const pageController=require('../controller/page')
const postController = require('../controller/post')

router.get('/',pageController.pageHome)
router.get('/user',postController.newPost)


module.exports=router