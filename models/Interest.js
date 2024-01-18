const mongoose = require('mongoose')


const interestSchema = new mongoose.Schema({
  interestId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    index: { unique: true },
    required: true,
  },
  interestName: {
    type: String,
    unique: true,
    required: true,
  },
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
