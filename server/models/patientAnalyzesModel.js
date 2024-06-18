var mongoose = require("../database");

var AnalyzesPatientSchema = mongoose.Schema({
  idPatient: String,
  addedDate: Date,
  nameFile: String,
  pdfFile: String,
});

module.exports = mongoose.model("AnalyzesPatient", AnalyzesPatientSchema);
