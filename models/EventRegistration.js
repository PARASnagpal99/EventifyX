const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventRegistrationSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event', 
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
}, { timestamps: true });

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

module.exports = EventRegistration;
