var mongoose  = require("mongoose");

var videoSchema = mongoose.Schema({
  title:    { type: String, unique: true, required: true },
  genre:    { type: String },
});

module.exports = mongoose.model("Video", videoSchema);