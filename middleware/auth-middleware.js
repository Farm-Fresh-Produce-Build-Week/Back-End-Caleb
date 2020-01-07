const jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "Shall not pass! Login or Register to view this information. Your previously saved token might be out of date." });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({
        you: "can't touch that!",
        suggestion: "Login or Signup to view this information"
      });
  }
};
