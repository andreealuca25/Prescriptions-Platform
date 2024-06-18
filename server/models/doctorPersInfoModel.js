var mongoose = require("../database");

var PersonalInfoDoctorSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  familyName: String,
  CNP: String,
  dateOfBirth: Date,
  gender: String,
  CUIM: String,
  sanitaryUnit: String,
  county: String,
  town: String,
  isActive: Boolean,
  role: String,
  profilePic: String,
  cnpList: Array,
});

module.exports = mongoose.model("PersonalInfoDoctor", PersonalInfoDoctorSchema);
