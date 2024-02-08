const express = require("express")
const route= express.Router()
const user = require("../model/userMode")
const bycrpt= require("bcrypt")
const jwt = require('jsonwebtoken')
const athorize=require("../middleware/athorize")
route.post("/register",async(req,res)=>{

    const salt = await bycrpt.genSalt(10)
    const hashpassword = await bycrpt.hash(req.body.password,salt)
    req.body.password=hashpassword
    try{
        const userexsist= await user.findOne({email:req.body.email})
        if(userexsist){
           return res.send({
            sucess:false,
            message:"Email already exsist",
           })
        }
       
        const newuser =  await new user(req.body);
         await newuser.save();
        
        

    }
    catch(err){
        console.log(err,"error jeson");
    }
})


route.post("/login",async(req,res)=>{
    let User = await user.findOne({email:req.body.email})
    console.log(User)
    if(!User){
        return res.send({
        sucess:false,
        message:"user does not exsisit"
    })
}
const token = jwt.sign({userid:User._id},process.env.jwt_Secretkey,{
    expiresIn:'1d'
});
console.log(token);
const isvalidpassword = await bycrpt.compare(
    req.body.password,
    User.password)

    
if (!isvalidpassword){
    return res.send({
        sucess:false,
        message:"invalid password"
    });
}
res.send({
    sucess:true,
    message:"Logined Sucessfully",
    data:token
});
});

route.get("/get-currntuser",athorize,async(req,res)=>{
    try{
        const user = await user.findById(req.body.userid).select("-password")
        res.send({
            success:true,
            message:"User detail fetched",
            data:user,
        });

    }
    catch(error){
       res.send({
        success:false,
        message:"failed",
       });
    }
});

module.exports=route