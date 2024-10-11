const UserModel = require("../models/usermodel");
var jwt = require('jsonwebtoken');
var localStorage = require('localStorage')
const bcrypt = require('bcrypt')
let saltRound = 12
let secretKey = "hellohi@456"

const saveUser = async(req,res)=>{
    const {name,email,pwd} = req.body
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(pwd, salt);

    let result = new UserModel({
        name:name,
        email:email,
        password:hash
    })
    await result.save()
    if(result){
        res.redirect('/user/login') 
    }
}

const dashboard =(req,res)=>{
    res.render("login")
}
const login =(req,res)=>{
    res.render("login")
}
const registration =(req,res)=>{
    res.render("registration")
}
const checkLogin = async(req,res)=>{
    const {email,pwd} = req.body
   
    let result = await UserModel.find({email:email})
   
    if(result.length > 0){
        console.log(result[0].password);
        console.log(pwd)
        let ans = bcrypt.compareSync(pwd,result[0].password); 
        console.log(ans)
        if(ans){
            let data = {
                name:result[0].name,
                email:result[0].email
            }
            console.log(data)
            let token = jwt.sign(data,secretKey)
            result[0].token = token
            result[0].save()
            localStorage.setItem('token',token)
            localStorage.setItem('userid',result[0]._id)
            res.render('dashboard')
            
        } else {
            res.redirect('/user/login')
            
        }
    } else {
        res.redirect('/user/login')
        
    }
   
}
const logout = async(req,res)=>{
    let getToken = localStorage.getItem('token')
    let getUserId = localStorage.getItem('userid')
    let result = await UserModel.findByIdAndUpdate(getUserId,{
        token:''
    })
    if(result){
        res.redirect('/user/login')
    }
}
module.exports={dashboard,login,registration,logout,checkLogin,saveUser}