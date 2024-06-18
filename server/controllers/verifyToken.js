const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //middleware to verify jwt token
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ answer: "access denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ answer: "invalid token" });
  }
};
