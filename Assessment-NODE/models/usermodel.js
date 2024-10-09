const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/JWTToken')
.then(() => console.log('Connected to Db!'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:String,
  email:String,
  password:String,
  token:String
});

const usermodel= mongoose.model("User",userSchema)
module.exports = usermodel