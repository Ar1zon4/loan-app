const auth = require('../model/auth')
exports.newPost = (req,res,next)=>{
    auth.findAll().then(result=>{
        res.json([result])
    })
}
