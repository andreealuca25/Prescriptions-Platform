const patientPrescriptions = require("../models/patientPrescriptionsModel");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const prescriptionValidator = (data) => {
  const prescriptionSchema = Joi.object({
    idPatient: Joi.string().required(),
    idDoctor: Joi.string().required(),
    status: Joi.string().required(),
    addedDate: Joi.date().required(),
    pdfFile: Joi.any().required(),
    sourceTarget: Joi.any().required(),
    medicalDrugs: Joi.any().required(),
  });
  return prescriptionSchema.validate(data);
};
const insertPDF = async (req, res) => {
  let prescription = req.body;
  prescription["idDoctor"] = jwt.decode(req.body.idDoctor)["_id"];
  const { error } = prescriptionValidator(prescription);
  if (error) return res.status(400).send({ answer: error.details[0].message });
  const newPrescription = new patientPrescriptions(prescription);
  await newPrescription.save();

  res.send({ answer: "added" });
};

const getPDFs = async (req, res) => {
  const idPatient = req.headers["id-patient"];
  const pdfs = await patientPrescriptions.find({ idPatient: idPatient });
  res.send({ answer: pdfs });
};

const getPDFsForPatient = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const idPatient = jwt.decode(received_jwt)["_id"];
  const pdfs = await patientPrescriptions.find({ idPatient: idPatient });
  res.send({ answer: pdfs });
};
const removePDF = async (req, res) => {
  const pdf = await patientPrescriptions.deleteOne({ _id: req.body.idPdf });
  if (pdf) res.send({ answer: "pdf found" });
};
const updatePDF = async (req, res) => {
  const filter = { _id: req.body.idPdf };
  console.log(filter);
  await patientPrescriptions.findOneAndUpdate(filter, { status: "complete" });
};

const getAllMedications = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const idDoctor = jwt.decode(received_jwt)["_id"];
  const medications = await patientPrescriptions.find({ idDoctor: idDoctor });

  let arrayOfObjects = medications.map((obj) => ({
    medicalDrugs: obj["medicalDrugs"],
    sourceTarget: obj["sourceTarget"],
  }));
  const result = {};
  arrayOfObjects.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(...item[key]);
    });
  });
  res.send({ answer: result });
};

const getAllMedicationsForPatient = async (req, res) => {
  const idPatient = req.headers["id-patient"];
  received_jwt = req.headers["auth-token"];
  const idDoctor = jwt.decode(received_jwt)["_id"];
  const medications = await patientPrescriptions.find({
    idDoctor: idDoctor,
    idPatient: idPatient,
  });

  let arrayOfObjects = medications.map((obj) => ({
    medicalDrugs: obj["medicalDrugs"],
  }));
  const result = {};
  arrayOfObjects.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(...item[key]);
    });
  });
  res.send({ answer: result });
};
module.exports = {
  insertPDF,
  getPDFs,
  removePDF,
  getPDFsForPatient,
  updatePDF,
  getAllMedications,
  getAllMedicationsForPatient,
};
