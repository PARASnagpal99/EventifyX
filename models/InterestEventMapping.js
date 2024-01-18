const mongoose = require('mongoose')

const InterestEventMappingSchema = new mongoose.Schema({
    interestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interest',
        required: true,
      },
     events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      }],      
})

const InterestEventMap = mongoose.model('InterestEventMap',InterestEventMappingSchema);
module.exports = InterestEventMap ;