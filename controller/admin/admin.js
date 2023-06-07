const Admin=require('../../model/admin')
const User =require('../../model/user')


exports.postLoan=(req,res)=>{
    res.render('admin-dashboard/new-loan')
}

exports.addLoan=(req,res)=>{
    const{amount,loantype,intrest,time}=req.body
    Admin.create({
        amount:amount,
        loantype:loantype,
        intrest:intrest,
        time:time
    }).then(loan=>{
        res.render('admin-dashboard/new-loan')
    }).catch(err=>{
        console.log(err)
    })    
    
}

exports.dashBoard=(req,res)=>{
    res.render('admin-dashboard/dashname')
}

exports.homePage=(req,res)=>{
    res.render('home-page/home')
}


exports.loansAvaliable=(req,res)=>{
    Admin.findAll()
    .then(display=>{
        res.render('admin-dashboard/post-loan',{loan:display})
    })
   
}

exports.updateLoan=(req,res)=>{
    const id =req.params.id
    Admin.findByPk(id)
    .then(update=>{
        res.render('admin-dashboard/update',{loan:update})
    }).catch(err=>{
        console.log(err)
    }) 
}

exports.getUpdate=(req,res)=>{
    const {id,amount,loantype,intrest,time} =req.body
    Admin.findByPK(id)
    .then(update=>{
        update.amount=amount,
        update.loantype=loantype,
        update.intrest=intrest,
        update.time=time
       return update.save()
    }).then(update=>{
        res.redirect('/new-loan')
    }).catch(err=>{
        console.log(err)
    })
}

exports.deleteLoan=(req,res)=>{
    const{id}=req.body
    Admin.findAll({
        where:{
            id:id
        }
    })
    .then(blog=>{
        let deleteIt=blog[0]
        return deleteIt.destroy()
    }).then(blog=>{
        res.render('admin-dashboard/post-loan')
    })
}
exports.deleteProp=(req,res)=>{
    const {id}=req.body
    User.findAll({
        where:{
            id:id
        }
    }).then(blog=>{
        let deleteProp=blog[0]
        return deleteProp.destroy()
    }).then(blog=>{
        res.render('admin-dashboard/verifiy-loan')

    })
}


exports.verifiyLoan=(req,res)=>{
    
    User.findAll()
    .then(confirm=>{
        res.render('admin-dashboard/verifiy-loan',{user:confirm})    
    })
    
}
