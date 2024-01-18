const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  event_description: { type: String },
  event_id: { type: String, required: true, unique: true },
  event_url: { type: String, required: true },
  category_id: { type: String , required : true},
  venue_id: { type: String , required : true},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
