const express = require("express")
const session = require('express-session');
const flash = require('connect-flash');
const app = express()
app.set("view engine","ejs")
const userroutes= require("./Routes/userroutes")

app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/',(req,res)=>{
   res.send('dashboard')
})
app.use('/user',userroutes)
app.listen(4001,()=>{
    console.log('Server is running on port 4001')
})