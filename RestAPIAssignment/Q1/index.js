// server.js
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const taskroutes = require('./routes/taskRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // For PUT and DELETE methods
app.set('view engine', 'ejs');

// Routes
app.use('/', taskroutes);

app.listen(3000,()=>{
    console.log("listening on 3000 port")
})