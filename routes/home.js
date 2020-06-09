const express=require('express');
const router=express.Router();
const path=require('path')
const userapi=require('../controllers/security')
router.use(express.json());
router.get('/',(requestAnimationFrame,res)=>{
    // res.redirect('/start');
   res.send('server up..')  
})
router.post('/signup',userapi.user_signup);   
router.post('/login',userapi.user_login);
router.post('/managerlist',userapi.GetADDManagerA);
router.post('/deptmentamtup',userapi.user_detailUpByID);
router.post('/getuserdepart',userapi.GetDepartByID);

router.post('/addmanagaer_sec',userapi.AddManagaerSec);

router.post('/getaddmanagersec',userapi.Getaddmanagersec);

router.get('/getsignup_chetan',userapi.GetSignUp);

router.get('/getsignupdel_chetan',userapi.GetSignUpDelete);

module.exports=router