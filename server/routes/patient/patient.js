const express = require("express");
const router = express.Router();
const patientRegisterController = require("../../controllers/patient/patientRegisterController");
const patientFunctController = require("../../controllers/patient/patientFunctController");
const verifyToken = require("../../controllers/verifyToken");

router.post("/register", patientRegisterController.insertNewPatient);

router.get(
  "/getPersonalInfo",
  verifyToken,
  patientFunctController.getPersonalInfo
);

router.get("/getInfoOnId", verifyToken, patientFunctController.getInfoOnId);
router.patch(
  "/updatePersonalInfo",
  verifyToken,
  patientFunctController.updatePersonalInfo
);

router.post("/addAnalysis", verifyToken, patientFunctController.addAnalysis);
router.get("/getAnalyzes", verifyToken, patientFunctController.getAnalyzes);
router.delete(
  "/removeAnalysis",
  verifyToken,
  patientFunctController.removeAnalysis
);

router.get("/getDoctorId", verifyToken, patientFunctController.getDoctorId);
module.exports = router;
