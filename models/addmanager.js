const moongoose=require('mongoose'); 
const ratingSchema=moongoose.Schema({
    _id:moongoose.Schema.Types.ObjectId,
    firstname:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    lastname:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    password:{type:String,required:true},
    email:{ 
        type: String,
        required:true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true
    },
    DeptAmtLimit:{type:String,required:true,maxlength:15,trim:true},
    managementType:{type:String,required:true,minlength:3,maxlength:15,trim:true},
    parentID:{type:String,required:true,trim:true},
    userid:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})
module.exports=moongoose.model('addmanager',ratingSchema);