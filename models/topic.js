var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
  title:          String,
  question:       String,
  solution:       String,
  helpedUser:     {type: mongoose.Schema.ObjectId, ref: "User"},
  status:         String
});

module.exports = mongoose.model('Topic', topicSchema);
