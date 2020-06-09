const express=require('express')
const app=express();
const ejs=require('ejs');
const home=require('./routes/home');
const path=require('path')
const mongoose=require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method ===   'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/',home);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(morgan('dev'));
const dba='mongodb://chetan123:chetan123@ds241288.mlab.com:41288/diaperchange';
mongoose.connect(dba,{useNewUrlParser:true},function(error){
    if(error) console.log(error);
    console.log("connection successful"); 
});
mongoose.set('useCreateIndex',true)
var db=mongoose.connection
module.exports=app;