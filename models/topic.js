var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
  title:          { type: String },
  question:       { type: String },
  solution:       { type: String },
  user:           { type: mongoose.Schema.ObjectId, ref: "User" },
  helpedUser:     { type: mongoose.Schema.ObjectId, ref: "User" },
  solution:       { type: String },
  resolved:       { type: Boolean, default: false }
});

module.exports = mongoose.model('Topic', topicSchema);
