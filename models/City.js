const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  cityId: {
    type: Number, 
    unique: true,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
});

const City = mongoose.model('City', citySchema);

module.exports = City;
