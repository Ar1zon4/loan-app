const Admin = require("../../model/admin")
const User=require("../../model/user")
const Register=require('../../model/auth')

const nodemailer=require('nodemailer')
const crypto=require('crypto')
const user = require("../../model/user")

exports.userDashboard=(req,res)=>{
    let user=[];
    // for(let value in UserData){
    //     user.push(value)
    // }
    console.log(user.length)
    let count=0
    for(let value of user){
        if(user[value]!==null){
            count++
        }
    }
    // console.log(UserData)
    console.log(count)
    let total=user.length
    let complete;
    complete=Math.ceil(count / total*100)


    console.log(complete + '%')
    


     User.findAll()
     .then(welcome=>{

        req.session.save(()=>{
            res.render('user-dashboard/dash',{user:welcome})
    
         })

     })
     
}

exports.usersLoan=(req,res)=>{
    Admin.findAll()
    .then(user=>{
        res.render('user-dashboard/avaliable-loan',{loan:user})

    })
}


exports.postId=(req,res)=>{
    res.render('user-dashboard/verify-id')
}

exports.verifyPage=(req,res)=>{
    res.render('user-dashboard/verifiy-page')
}

exports.postVerify=(req,res)=>{
    const{legalname,ssn,nin,image,email}=req.body
    let imagepath='/images/'+req.file.filename
    console.log(imagepath)
    User.create({
        
        legalname:legalname,
        ssn:ssn,
        nin:nin,
        image:imagepath
    }).then(user=>{

        
            
                   return req.session.save(()=>{
                      return  res.redirect('/verified')
                    })
                }).catch(err=>console.log(err))
                
                    
                  
                
        
        }
        
       

exports.verifiedPage=(req,res)=>{
    res.render('user-dashboard/verified')

}

exports.approvalPage=(req,res)=>{
    res.render('user-dashboard/approval-page')
}


