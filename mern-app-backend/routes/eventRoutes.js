const eventCtr = require('../controller/Event.js');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();



//get all events,edit event, delete event, new event, find
router.get('/',eventCtr.getAll);
router.delete('/dropby',auth,eventCtr.dropEventbyUser)
router.put('/update',auth,eventCtr.update);
router.delete('/:id',auth,eventCtr.delete);
router.post('/new',auth,eventCtr.newEvent);
router.get('/my_events',auth,eventCtr.getMyEvents);
router.get('/bookings',auth,eventCtr.myBookings);
router.put('/book',auth,eventCtr.bookEvent);

//router.put('/unbook',auth,eventCtr.unbookEvent);


module.exports = router;