const express =require('express');
//const auth = require('../middleware/auth');
//make sure to put auth

const userCtrl = require('../controller/User');

const userRoute = express.Router();

userRoute.post('/signup',userCtrl.signup);
userRoute.post('/login',userCtrl.login);
userRoute.post('/tokenIsValid',userCtrl.isValidToken);
userRoute.get('/',userCtrl.find);
userRoute.delete('/:id',userCtrl.deleteUser); 
module.exports = userRoute;