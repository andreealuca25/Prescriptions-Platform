const doctorPersInfo = require("../../models/doctorPersInfoModel");
const patientPersInfo = require("../../models/patientPersInfoModel");
const patientAnalyzes = require("../../models/patientAnalyzesModel");
const jwt = require("jsonwebtoken");
const getPersonalInfo = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const userId = jwt.decode(received_jwt)["_id"];
  const user = await doctorPersInfo.findOne({ _id: userId });
  if (user) res.send(user);
};

const updatePersonalInfo = async (req, res) => {
  const update = req.body;
  received_jwt = req.headers["auth-token"];
  const filter = { _id: jwt.decode(received_jwt)["_id"] };
  if (update) await doctorPersInfo.findOneAndUpdate(filter, update);
};

const insertCnpForDoctor = async (req, res) => {
  const update = req.body.cnp;
  console.log(update);
  received_jwt = req.headers["auth-token"];
  const filter = { _id: jwt.decode(received_jwt)["_id"] };
  if (update)
    await doctorPersInfo.findOneAndUpdate(filter, {
      $push: { cnpList: update },
    });
};

const insertCnpsForDoctor = async (req, res) => {
  const update = req.body.cnp;
  console.log(update);
  received_jwt = req.headers["auth-token"];
  const filter = { _id: jwt.decode(received_jwt)["_id"] };
  if (update)
    await doctorPersInfo.findOneAndUpdate(filter, {
      $push: { cnpList: { $each: update } },
    });
};
const getPatients = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const userId = jwt.decode(received_jwt)["_id"];
  const user = await doctorPersInfo.findOne({ _id: userId });

  const patients = await patientPersInfo.find({
    //get all the patients associated with this doctor
    CUIM: user.CUIM,
  });
  res.send(patients);
};

const getAnalyzes = async (req, res) => {
  const idPatient = req.headers["id-patient"];
  const analyzes = await patientAnalyzes.find({
    idPatient: idPatient,
  });
  res.send({ answer: analyzes });
};
module.exports = {
  getPersonalInfo,
  updatePersonalInfo,
  getPatients,
  insertCnpForDoctor,
  insertCnpsForDoctor,
  getAnalyzes,
};
