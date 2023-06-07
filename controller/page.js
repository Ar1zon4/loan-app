exports.pageHome=(req,res)=>{
    let register=req.session.register
    res.json(register)
}