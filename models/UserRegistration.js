const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRegistrationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  events: [
    {
      event_name: {
        type: String,
        required: true
      },
      event_description: {
        type: String,
        required: true
      },
      event_id: {
        type: String,
        required: true
      },
      event_url: {
        type: String,
        required: true
      }
    }
  ]
});

const UserRegistration = mongoose.model('UserRegistration', userRegistrationSchema);

module.exports = UserRegistration;
