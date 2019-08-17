var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  queuedBookings: [String],
  queuedBonusPointBookings : [String],
  historicalBookings : [String],
  historicalBonusBookings : [String],
  bonusPoints : { type: Number, default: 0 },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;