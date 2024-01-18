const mongoose = require('mongoose');

const cityEventMappingSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Types.ObjectId ,
    ref : 'City',
    unique : true ,
    required: true,
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
});

const CityEventMapping = mongoose.model('CityEventMapping', cityEventMappingSchema);

module.exports = CityEventMapping;
