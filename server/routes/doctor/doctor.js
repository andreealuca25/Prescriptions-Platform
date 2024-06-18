const express = require("express");
const router = express.Router();
const doctorRegisterController = require("../../controllers/doctor/doctorRegisterController");
const doctorFunctController = require("../../controllers/doctor/doctorFunctController");
const doctorCodeController = require("../../controllers/doctor/doctorCodeController");
const verifyToken = require("../../controllers/verifyToken");

router.post("/register", doctorRegisterController.insertNewDoctor);
router.get(
  "/getPersonalInfo",
  verifyToken,
  doctorFunctController.getPersonalInfo
);
router.patch(
  "/updatePersonalInfo",
  verifyToken,
  doctorFunctController.updatePersonalInfo
);

router.patch(
  "/insertCnpForDoctor",
  verifyToken,
  doctorFunctController.insertCnpForDoctor
);

router.patch(
  "/insertCnpsForDoctor",
  verifyToken,
  doctorFunctController.insertCnpsForDoctor
);
router.get("/getCUIM", verifyToken, doctorCodeController.getCUIM);
router.get("/getPatients", verifyToken, doctorFunctController.getPatients);
router.get("/getAnalyzes", verifyToken, doctorFunctController.getAnalyzes);
module.exports = router;
