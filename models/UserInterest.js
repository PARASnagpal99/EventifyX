const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInterestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  interests: Array 
});

const UserInterest = mongoose.model('UserInterest', userInterestSchema);

module.exports = UserInterest;
