const Register=require('../model/auth')
const Details=require('../model/bankdetail')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')


exports.registerPage=(req,res)=>{
    // let error=req.flash('error')
    res.render('auth/registration')
}



exports.registerPost=(req,res)=>{
    // let error=validationResult(req)
    // if(! error.isEmpty()){
    //     req.flash('error',error.array())
    //     req.session.save(()=>{
    //         res.redirect('/')
    //     })
    // }
    const {email,password,bvn,token}=req.body
    let coding;
    let otp=[]
    for(let i=0;i<6;i++){
        coding =Math.floor(Math.random()*10)
        otp += coding
    }
    
    console.log(otp)
    

  
  
   
    bcrypt.hash(password,12).then(hashedPassword=>{
        Register.create({
            email:email,
            password:hashedPassword,
            // token:token,
            otp:otp,
            bvn:bvn
    
        }).then(user=>{
       const email ={
            to: [user.email, 'omolewu12@gmail.com'],
            from: {
              name: 'O-Mart',
              email: 'info@o-mart.com.ng'
            },
            subject: 'Welcome to O-mart Shopping',
            html:`
             <h2>Welcome ${user.email}</h2>
            `
          }
          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b43b77973b6e34",
              pass: "e3b0039c45abe9"
            }
          })
          transport.sendMail(email).then((respons)=>{
            return res.redirect('/otp-page');
          }).catch(err=> console.log(err)) 
            
                }).catch(err=>{
                    console.log(err)
                })
              
    }) 
   
        

}


exports.dashBoard=(req,res)=>{
    res.render('admin-dashboard/dashname')
}

exports.confirmPage=(req,res)=>{
    res.render('auth/otp-page')
}

// const numbers =[]
// numbers[0]=document.getElementById('input1').value;
// numbers[1]=document.getElementById('input2').value;
// numbers[2]=document.getElementById('input3').value
// displayNums.innerHTML = numbers



exports.otpPage=(req,res)=>{
    // let first = document.getElementById('first')
    // let second = document.getElementById('second')
    // let third = document.getElementById('third')
    // let fourth = document.getElementById('fourth')
    // let fifth = document.getElementById('fifth')
    // let sixth = document.getElementById('sixth')
  const allOtp = []
  const{first,second,third,fourth,fifth,sixth} =allOtp
    // const {otp}=req.body
    Register.findOne({
        where:{
            otp:allOtp
        }
            
    }).then(result=>{
        res.render('auth/login')
    }).catch(err=>{
        res.send('Nothing to see :/')
    })
    // console.log(otp)
}

exports.bankDetails=(req,res)=>{
    res.render('auth/bank-details')
}

exports.bankCollect=(req,res)=>{
    const {bankname,accountnumber,accounttype,cvv}=req.body
    Details.create({
        bankname:bankname,
        accountnumber:accountnumber,
        accounttype:accounttype,
        cvv:cvv
    }).then(user=>{
        res.redirect('/user-dashboard')
    })
    
    console.log(req.body)
}


exports.loginPage=(req,res)=>{
    res.render('auth/login')
}

exports.postLogin=(req,res)=>{
 const {email,password}=req.body
 Register.findOne({
    where:{
        email:email,
    }
 })
 bcrypt.compare(password)
 .then(register=>{
    if(!register){
     return   res.render('auth/login')
    }

    req.session.isLoggedIn=true
    req.session.user=register
    return res.redirect('/bank-details')
 }) 
   
 
}

exports.forgotPassword=(req,res)=>{
    res.render('auth/forgot-password')
}

exports.postForgot=(req,res)=>{
    // const {email}=req.body
    crypto.randomBytes(6,(err,buffer)=>{
        if(err){
            req.flash('userError','Unable to perform this function at the moment')
            return req.session.save(()=>{
                res.redirect('/forgot-password')
            })
        }
        const {email}=req.body
        let token=buffer.toString('hex')
       
        Register.findOne({
            where:{
                email:email
            }
        }).then(user=>{
            if(!user){
                req.flash('userError', 'Unable to perform this function at the moment')
                return req.session.save(()=>{
                    res.redirect('/forgot-password')
                })
            }
            user.resetToken=token;
            user.resetTokenExpiration=Date.now()+90000000
    //    ------
    let Email={
        to:user.email,
        from:{
            name:'loan-app',
            email:'info@loan-app.com'
        },
        subject:'Retrive password',
        html:`
       <h2> You requested to retrive your password</h2>
          <p><a href="http:/localhost:3000/retrive-password/${token}">Click here </a> to retrive your password</p>
             <p>This link will expire in the next 24 hours.<br>
                Kindly ignore if you don't send this request
           </p>
        
        `
    }
    var transport=nodemailer.createTransport({
        host:'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: "b43b77973b6e34",
            pass: "e3b0039c45abe9"
          }
    })
    transport.sendMail(Email).then((response)=>{
    //    return req.session.save(()=>{
          return   res.redirect('/login')
        // })
    }).catch(err=>console.log(err))
    //  req.session.save(()=>{
        res.redirect('/dashboard-page')
    //  })
        })
        console.log(token)
      
    })
       
}






