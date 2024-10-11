const express = require("express")
const router = express.Router()
const {dashboard,login,registration,saveUser,checkLogin,logout}=require("../controllers/usercontroller")

router.get("/",dashboard)
router.get("/login",login)
router.get("/logout",logout)
router.get("/registration",registration)
router.post("/login",checkLogin)
router.post("/saveuser",saveUser)
module.exports=router

