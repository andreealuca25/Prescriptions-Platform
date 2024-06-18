const DoctorPersInfo = require("../../models/doctorPersInfoModel");
const PatientPersInfo = require("../../models/patientPersInfoModel");
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
    sanitaryUnit: Joi.string().required(),
    county: Joi.string().required(),
    town: Joi.string().required(),
    CUIM: Joi.string().required(),
    isActive: Joi.boolean().required(),
    role: Joi.string().required(),
    profilePic: Joi.string().required(),
  });
  return registerSchema.validate(data);
};
const insertNewDoctor = async (req, res) => {
  const newDoctor = new DoctorPersInfo(req.body);
  let emailExists = await DoctorPersInfo.findOne({
    email: newDoctor.email,
  });
  if (!emailExists)
    emailExists = await PatientPersInfo.findOne({
      email: newDoctor.email,
    });
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send({ answer: "incorrect" });
  if (!emailExists) {
    const salt = await bcrypt.genSalt(10);
    newDoctor.password = await bcrypt.hash(newDoctor.password, salt);
    const user = await newDoctor.save();
    res.send({ answer: user["_id"], role: "doctor" });
  } else res.send({ answer: "incorrect" });
};

module.exports = { insertNewDoctor };
