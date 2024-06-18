const patientPersInfo = require("../../models/patientPersInfoModel");
const doctorPersInfo = require("../../models/doctorPersInfoModel");
const patientAnalyzes = require("../../models/patientAnalyzesModel");
const jwt = require("jsonwebtoken");

const Joi = require("joi");

const analysisValidator = (data) => {
  const analysisSchema = Joi.object({
    idPatient: Joi.string().required(),
    addedDate: Joi.date().required(),
    pdfFile: Joi.any().required(),
    nameFile: Joi.string().required(),
  });
  return analysisSchema.validate(data);
};
const getPersonalInfo = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const userId = jwt.decode(received_jwt)["_id"];
  const user = await patientPersInfo.findOne({ _id: userId });
  if (user) res.send(user);
};

const getDoctorId = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const userId = jwt.decode(received_jwt)["_id"];
  const user = await patientPersInfo.findOne({ _id: userId });
  if (user) {
    const doctor = await doctorPersInfo.findOne({ CUIM: user.CUIM });
    if (doctor) res.send({ id: doctor._id });
  }
};
const updatePersonalInfo = async (req, res) => {
  const update = req.body;
  received_jwt = req.headers["auth-token"];
  const filter = { _id: jwt.decode(received_jwt)["_id"] };
  if (update) await patientPersInfo.findOneAndUpdate(filter, update);
};

const getInfoOnId = async (req, res) => {
  const userId = req.headers["patient-id"];
  const user = await patientPersInfo.findOne({ _id: userId });
  if (user) res.send(user);
};

const addAnalysis = async (req, res) => {
  let analysis = req.body;
  analysis["idPatient"] = jwt.decode(req.body.idPatient)["_id"];
  const { error } = analysisValidator(analysis);
  if (error) return res.status(400).send({ answer: error.details[0].message });
  const newAnalysis = new patientAnalyzes(analysis);
  await newAnalysis.save();
  res.send({ answer: "added" });
};

const getAnalyzes = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const idPatient = jwt.decode(received_jwt)["_id"];
  const analyzes = await patientAnalyzes.find({ idPatient: idPatient });
  res.send({ answer: analyzes });
};

const removeAnalysis = async (req, res) => {
  const analysis = await patientAnalyzes.deleteOne({
    _id: req.body.idAnalysis,
  });
  if (analysis) res.send({ answer: "analysis found" });
};

module.exports = {
  getPersonalInfo,
  updatePersonalInfo,
  getInfoOnId,
  addAnalysis,
  getAnalyzes,
  removeAnalysis,
  getDoctorId,
};
