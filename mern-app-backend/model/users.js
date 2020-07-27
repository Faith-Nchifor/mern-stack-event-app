const mongoose= require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    role:{type:String ,required:true,default:"user"}
});

userSchema.plugin(uniqueValidator);
module.exports =user= mongoose.model('Event_Users',userSchema);