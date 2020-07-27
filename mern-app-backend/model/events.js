const mongoose= require('mongoose')
let eventSchema = mongoose.Schema({
	title:{type:String,required:true},
   
    date:{type:String, required:true},
   imageUrl:{type:String,required:true},
   description:{type:String, required:true},
   organizer:{type:mongoose.Schema.Types.ObjectId,ref:'Event_Users'},
   attending:[{type:mongoose.Schema.Types.ObjectId,ref:'Event_Users'}]
  
});
module.exports = event=mongoose.model('Events',eventSchema);
/*
if click attend create new schema called event-name that has fiels
attendee, email
 */