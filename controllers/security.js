const users=require('../models/user');
const addmanager=require('../models/addmanager');
const addmanagersec=require('../models/addmanagersec');


const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');
const express=require('express'); 
const app=express();
const morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(morgan('dev'));

exports.user_signup=(req,res,next)=>{
    console.log('email='+req.body.email)
    users.findOne({ email:req.body.email})
    .exec()
    .then(user=>{
        if(user) {
            return res.status(200).json({
                message:"Email ID already exist.",statusCode:300
            });
        }
        else {
            const user=new users({
                _id:mongoose.Types.ObjectId(),
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                DeptAmtLimit:req.body.DeptAmtLimit,
                DeptName:req.body.DeptName,
                managementType:req.body.managementType,
                email:req.body.email,
                password:req.body.password,
                parentID:req.body.parentID
            });
            user.save().then(result=> { 
                // if(req.body.managementType == "ManagerA") {
                //     var Userid=req.body.Userid;
                //     var SelectedAmt=req.body.SelectedAmt;
                //     const addmanagerCreate=new addmanager({
                //         _id:mongoose.Types.ObjectId(),
                //         firstname:req.body.firstname,
                //         lastname:req.body.lastname,
                //         DeptAmtLimit:req.body.DeptAmtLimit,
                //         managementType:req.body.managementType,
                //         email:req.body.email,
                //         password:req.body.password,
                //         userid:req.body.selectUsrID
                //     }); 
                //     addmanagerCreate.save().then(result=> {
                //         res.status(200).json({
                //             message:'Successful Registration!',statusCode:200
                //         });
                //     }).catch(err=>{
                //         res.status(500).json({
                //             error:err,statusCode:200
                //         });
                //     }); 
                // }
                // else {
                    res.status(200).json({
                        message:'Successful Registration!',statusCode:200
                    });
                //}
            }).catch(err=>{
                res.status(500).json({
                    error:err,statusCode:300
                });
            });  
        }
    });
}


exports.user_detailUpByID=(req,res,next)=> {     
    users.findOne({_id:req.body.userid}).exec().then(doc=>{
        doc.DeptAmtLimit = req.body.SelectedDeptAmt;
        doc.save(); 
        return res.status(200).json({ message:"Successful Registration!",statusCode:200 });
    }).catch(err=>{
        return res.status(200).json({ message:"Please try again later",statusCode:300 }); 
    })
}

exports.GetDepartByID=(req,res,next)=>{
    users.findOne({_id:req.body.userid}).exec().then(user=>{
        return res.status(200).json({ message:"getdata",getdata:user,statusCode:200 });
    }).catch(err=>{
        return res.status(200).json({ message:"err.",getdata:err,statusCode:300 });
    })  
}

exports.user_login=(req,res,next)=>{ 
    users.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user)
        {
            if(user.password==req.body.password)
            {
        const data={
                firstname:user.firstname,
                lastname:user.lastname,
                DeptAmtLimit:user.DeptAmtLimit,
                DeptName:user.DeptName,
                managementType:user.managementType,
                email:user.email,
                user_id:user._id
        }
       return res.status(200).json({
           message:'logged in',statusCode:200,
           data:user
       })
    }
else
{
    return res.status(200).json({
        message:'password wrong',statusCode:300
    });
}
       } 
       else
       {
        return res.status(200).json({
            message:'Email ID not exist',statusCode:300
        });  
       }
     }) 
}

exports.GetSignUp=(req,res,next)=>{
    users.find().exec().then(data=> {
         return res.status(200).json({
             message:data,statusCode:200
         });         
    }).catch(err=>{
        return res.status(200).json({
            message:err,statusCode:300
        });
    })
}

exports.GetSignUpDelete=(req,res,next)=>{
    users.remove().exec().then(data=> {
         return res.status(200).json({
             message:"Deleted successfully !",statusCode:200
         });         
    }).catch(err=>{
        return res.status(200).json({
            message:err,statusCode:300
        });
    })
}


exports.GetADDManagerA=(req,res,next)=>{
    // addmanager.find({userid:req.body.userid}).exec().then(data=> {
    //      return res.status(200).json({
    //         message:data,statusCode:200
    //      });         
    // }).catch(err=>{
    //     return res.status(200).json({
    //         message:err,statusCode:300
    //     });
    // });

    users.find({parentID:req.body.userid}).exec().then(data=> {
         return res.status(200).json({
            message:data,statusCode:200
         });         
    }).catch(err=>{
        return res.status(200).json({
            message:err,statusCode:300
        });
    });

}


exports.Getaddmanagersec=(req,res,next)=>{
    addmanagersec.find({userid:req.body.userid}).exec().then(data=> {
         return res.status(200).json({
            message:data,statusCode:200
         });         
    }).catch(err=>{
        return res.status(200).json({
            message:err,statusCode:300
        });
    });
}



exports.AddManagaerSec=(req,res,next)=>{ 
    addmanagersec.findOne({ email:req.body.email})
    .exec()
    .then(user=>{
        if(user) {
            return res.status(200).json({
                message:"Email ID already exist.",statusCode:300
            });
        }
        else {
            const user=new addmanagersec({
                _id:mongoose.Types.ObjectId(),
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                managementType:req.body.managementType,
                userid:req.body.userid,
            });
            user.save().then(result=> { 
                    res.status(200).json({
                        message:'Successful Registration!',statusCode:200
                    });
            }).catch(err=>{
                res.status(500).json({
                    error:err,statusCode:300
                });
            });  
        }
    });
}


