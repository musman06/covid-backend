const jwt = require("jsonwebtoken");

const isUserLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretkey");
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  isUserLoggedIn,
};
