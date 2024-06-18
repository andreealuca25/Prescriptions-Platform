var mongoose = require("../database");

var PrescriptionsPatientSchema = mongoose.Schema({
  idPatient: String,
  idDoctor: String,
  addedDate: Date,
  status: String,
  pdfFile: String,
  medicalDrugs: Array,
  sourceTarget: Array,
});

module.exports = mongoose.model(
  "PrescriptionsPatient",
  PrescriptionsPatientSchema
);
