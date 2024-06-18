const PatientPersInfo = require("../../models/patientPersInfoModel");
const DoctorPersInfo = require("../../models/doctorPersInfoModel");
let bcrypt = require("bcryptjs");
const Joi = require("joi");

const registerValidator = (data) => {
  const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    familyName: Joi.string().required(),
    CNP: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().required(),
    county: Joi.string().required(),
    town: Joi.string().required(),
    CUIM: Joi.string().required(),
    isActive: Joi.boolean().required(),
    role: Joi.string().required(),
    profilePic: Joi.string().required(),
  });
  return registerSchema.validate(data);
};
const insertNewPatient = async (req, res) => {
  const newPatient = new PatientPersInfo(req.body);
  const doctor = await DoctorPersInfo.findOne({
    CUIM: newPatient.CUIM,
  });
  let emailExists = await PatientPersInfo.findOne({
    email: newPatient.email,
  });
  if (!emailExists)
    emailExists = await DoctorPersInfo.findOne({
      email: newPatient.email,
    });
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send({ answer: "incorrect" });

  if (!doctor) res.send({ answer: "incorrect" });
  else if (!emailExists) {
    //check if the doctor has this patient in the list
    if (!DoctorPersInfo.findOne({ cnpList: newPatient.CNP }))
      return res.status(400).send({ answer: "incorrect" });
    else {
      const salt = await bcrypt.genSalt(10);
      newPatient.password = await bcrypt.hash(newPatient.password, salt);
      const user = await newPatient.save();
      res.send({ answer: user["_id"], role: "patient" });
    }
  } else res.send({ answer: "incorrect" });
};

module.exports = { insertNewPatient };
