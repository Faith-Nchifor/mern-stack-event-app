//db username: test
//db password: u2xfVzM8rwwSfCIe
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
let userRoutes = require('./routes/userRoutes');
let eventRoutes = require('./routes/eventRoutes')
const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://faith:u2xfVzM8rwwSfCIe@first-cluster-zloee.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    if(err) throw err;
    console.log('successful connection to database' )
})
require('./model/users')
require('./model/events')

//app.use(require('./middleware/auth'))
app.use('/api/user',userRoutes);
app.use('/api/event',eventRoutes);
module.exports = app;