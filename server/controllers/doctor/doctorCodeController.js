const doctorPersInfo = require("../../models/doctorPersInfoModel");
const jwt = require("jsonwebtoken");
const getCUIM = async (req, res) => {
  received_jwt = req.headers["auth-token"];
  const userId = jwt.decode(received_jwt)["_id"];
  const user = await doctorPersInfo.findOne({ _id: userId });
  if (user) res.send(user);
};

module.exports = { getCUIM };
