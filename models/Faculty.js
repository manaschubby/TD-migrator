var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var facultySchema = new Schema({
  // faculty Code
  psrn: {
    type: String,
    unique: true,
    required: true
  },
  name: String, // faculty Name
  email: {
    type: String,
    unique: true
  },
  dept: {
    type: mongoose.ObjectId,
    ref: "dept"
  }, // Department ID
  phone:{
    type: String,
    unique: true
  },
  room: String,
  desg: String
});

var model = mongoose.model("faculty", facultySchema);

module.exports = model;
