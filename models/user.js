const mongoose=require('mongoose'); 
const userSchema=mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        firstname:{type:String,maxlength:15,trim:true},
        lastname:{type:String,maxlength:15,trim:true},
        DeptAmtLimit:{type:String,required:true,maxlength:50,trim:true},
        DeptName:{type:String,required:true,minlength:3,maxlength:100,trim:true},
        managementType:{type:String,required:true,minlength:3,maxlength:15,trim:true},
        email:{ 
            type: String,
            required:true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim: true
        },
        password:{ type: String,required:true },
        parentID: { type:String,required:true,trim:true},
        create_date:{
            type:Date,
            default: Date.now
        },
        token_key:{type: String},
        token_expire:{type: String},
        status:{type:Number,default:1}
})
module.exports=mongoose.model('user',userSchema)