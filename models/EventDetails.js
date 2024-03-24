const mongoose = require('mongoose');

const eventDetail = new mongoose.Schema({
      event_id : { type: String, required: true, unique: true },
      created_by : { type : String} ,
      image_s3_key : {type : String} 
})

const EventDetails = mongoose.model('eventDetails',eventDetail);

module.exports =  EventDetails;


