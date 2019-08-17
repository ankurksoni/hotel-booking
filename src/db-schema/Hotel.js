const mongoose = require('mongoose');


const HotelSchema = new mongoose.Schema({
  name: String,
  id: String,
  roomIds: [String],
  bookedRoomIds: [String],
  availableRoomIds: [String],
  price: Number
}, {timestamps: true});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;
