const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/products', productRoutes);

app.listen(4000,()=>{
    console.log("listening on 4000 port");  
})