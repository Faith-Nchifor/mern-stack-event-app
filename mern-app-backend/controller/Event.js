const Event = require('../model/events');
//const jwt = require()

exports.newEvent = (req,res)=>{
  //  req.body.event = JSON.parse(req.body.event);
    //let id= req.body.userId;
    const {title,date,description,imageUrl} = req.body;
//req.user.password=undefined
    const event = new Event({
        title:title,
        imageUrl:imageUrl,
        date:date,
        description:description,
        organizer:req.user
        
//to be continued
    }).save().then(
        resp=>{
            res.status(201).json({message:'event added succesfully'});
            console.log(req.user)
            
        }
    ).catch(
        
        err => {
            console.log(err);
            res.json({error:'event validation failed.  make sure all the fields are valid and try again.'})}
    )
    
}
exports.getAll =  (req,res)=>{
    Event.find().populate('organizer','username _id').then(
        events=>{
            res.status(200).json(events);
        }
    ).catch(
        err=>{
            console.log(err)
            res.status(401).json({error:err});
        }
    )
    
}
exports.update=(req,res)=>{
   // let id = {_id: req.params.id}
    const {title,date,description,imageUrl,_id} = req.body;
    const event = new Event({
        _id,
         title,
    	date,
    	 description,
        imageUrl,
        organizer:req.user
    })
    Event.updateOne({_id:_id},event).then(
        (result)=>{
            res.status(201).json({
                updated_event:result,
                message:'thing successfully updated'
            });
        }
    ).catch(error=>{
        console.log(error)
        res.status(400).json({
            error:error
        });
    })
}

exports.delete = (req,res) =>{
    
        Event.deleteOne({_id:req.params.id}).then(
            ()=>{
                res.status(200).json({
                    message:'Deleted'
                });
            }
        ).catch(
            error=>{
                console.log(error)
                res.status(400).json({
                    error:error
                });
            }
        )
           
}


//find all your events
exports.getMyEvents =(req,res)=>{
    Event.find({
        organizer:req.user
    }).populate('attending','email username').then(
        events =>{
            res.status(200).json(events);
        }
    ).catch(
        error=>{
            res.status(404).json({
                error:error
            });
        }
    );
}

/*exports.getEventsAttending =(req,res) =>{ //events soecififc user is attending
	Event.find({attending:user._id}).then(
	events=>{
	res.status(200).json({events})
}	
).catch(err=>console.log(err) )
} */

exports.bookEvent =(req,res) =>{ //book new event
    //evt id,user id
    let {eventId} = req.body;

    Event.updateOne({_id:eventId},{$push:{attending:req.user}}).then(
        booked_user =>{
            res.status(201).json({message:'success',createdEvent:booked_user})
        }
    )

}

exports.myBookings = (req,res)=>{  //see events user has booked
    let _id = req.body._id;
    Event.find()
  .where('attending._id')
  .in([_id])
  .exec(function (err, records) {
   if(err){
       console.log(err)
   }
   console.log(_id)
   res.status(200).json({events:records})
  });
            //res.status().json()
        
    
    /*populate({
        path:'attending._id',
        match:{_id:{$gte: userId}},
    }).then(
        events =>{
            res.status(200).json({ //verify
                events
            })
        }
    ).catch(
        err =>{
            console.log(err)
          
        }
    )*/
}
exports.dropEventbyUser = (req,res) =>{
    let _id= req.body.id
    Event.deleteMany({organizer:_id}).then(
        res.status(201).json({message:'thing deleted successfully'})
    ).catch(
        err => console.log(error)
    )
}
exports.eventAttendees =(req,res) =>{ //geet all bookings for specific event
    let {eventId}= req.user
    Event.findById({_id:eventId}).populate({

    })
}