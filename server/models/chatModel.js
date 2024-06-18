var mongoose = require("../database");

var ChatSchema = mongoose.Schema({
  author: String,
  message: String,
  room: String,
  time: String,
});

module.exports = mongoose.model("Chat", ChatSchema);
