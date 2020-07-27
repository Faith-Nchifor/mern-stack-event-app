const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcript = require('bcrypt');
const {JWT_SECRET} = require('../config/config.js');

exports.signup = async (req,res)=>{
    let {email,password,username,role} = req.body;
    
   try{
    
    const salt = await bcript.genSalt();
    const hash = await bcript.hash(password, salt);
    const user= new User({
    email:email,
    password:hash,
    username:username,
    role:role
    });
    
    let savedUser= await user.save();
    res.status(201).json({savedUser})
    //res.json.parse(savedUser)
   }catch(err){
        err=>{
            res.status(500).json({error:'user already exist'});
        }
   }
    /*bcript.hash(req.body.password,10).then(
        hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash,

            });
            user.save().then(
                (res)=>{
                    res.status(201).json({message:'user added succesfully'})
                }
            ).catch(
                err=>{
                    res.status(500).json({error:"user already exists"})
                }
            )
        }
    )*/
}

exports.login=  (req, res,next) =>{
    try{
         User.findOne({email:req.body.email}).then(
             savedUser =>{
                 if(!savedUser){
                    return res.status(422).json({ error: "wrong user name or password" });
                 }
                 else {
                    bcript.compare(req.body.password, savedUser.password).then(
                        doMatch =>{
                            if(doMatch){
                                //const token = "TOKEN_TOKEN"; 
                                const token=jwt.sign({_id:savedUser._id},'JWT_SECRETTTTT')
                           res.json({
                               token,
                               user: {
                                   id: savedUser._id,
                                   username: savedUser.username,
                                   email: savedUser.email,
                                   role:savedUser.role
                               },
                               message:'succesful signin'
                           });
                            }
                            else return res.status(422).json({error:'invalid email or password'})
                        }
                    ).catch (err =>{
                        console.log(err)
                    })
                 }
                
             }
         )
    
    }catch(err){
        res.status(400).json({error:'invalid username or password'});
    console.log(err);
    }
        
}
exports.find = async(req,res)=>{
    try{
        //const id= req.params._id;
      const users=await User.find({role:"user"});
        res.status(200).json({users})
    }
    catch(err){
        res.status(400).json({error:err})
    }
}
exports.deleteUser =async(req,res) =>{
    try{
      
        let user =  await User.deleteOne({_id: req.params.id})  
        
        res.status(200).json({user,
        message:'successful delete'});
    }catch(error){
        res.status(404).json({error:error})
       //console.log(error)
    }
}
exports.isValidToken = async (req,res)=>{
    try{
        const token = req.header('auth-token');
        //console.log(token);
        if(!token) return  res.json(false);
        const  verified = jwt.verify(token,'JWT_SECRETTTTT');
        if(!verified) return res.json(false);
        
        const user = await user.findById(verified.id);
        if(!user) return res.json(false);

        return res.json.parse(true);
    } catch(err){
        res.status(500).json({error: err})
    }
}
/*exports.getAll =  async (req, res) => {
    const user = await User.find();
    res.json({
      email: user.email,
      id: user._id,
      username:user.username
    });
  }

/*exports.delete= async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete({_id:req.params.id});
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }*/