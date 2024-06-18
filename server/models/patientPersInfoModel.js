var mongoose = require("../database");

var PersonalInfoPatientSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  familyName: String,
  CNP: String,
  dateOfBirth: Date,
  gender: String,
  county: String,
  town: String,
  CUIM: String,
  isActive: Boolean,
  role: String,
  profilePic: String,
});

module.exports = mongoose.model(
  "PersonalInfoPatient",
  PersonalInfoPatientSchema
);
