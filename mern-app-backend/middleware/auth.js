const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const User = mongoose.model('Event_Users')
const {JWT_SECRET} = require('../config/config.js')

module.exports = (req,res,next)=>{
  const {authorization} = req.headers
  //authorization === Bearer ewefwegwrherhe
  if(!authorization){
     return res.status(401).json({error:"authorization required"})
  }
  const token = authorization.replace("Bearer ","")
  jwt.verify(token,'JWT_SECRETTTTT',(err,payload)=>{
      if(err){
       return   res.status(401).json({error:"invalid token"})
      }
      else{
      const {_id} = payload
      User.findById(_id).then(userdata=>{
          req.user = userdata
          next()
      })
    }
      
      
  })
}
  /*try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, 'ssjsdfjlsflkjnbhb',(err,payload)=>{
      if(err){
        return res.status(401).json({error:'you must be logged in'})
      }
    });
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified._id;
    next();
  } catch (err) {
    res.status(500).json({ error: err});
	console.log(err);
  }*/


