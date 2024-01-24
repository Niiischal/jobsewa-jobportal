const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get token from header
    const authorizationHeader = req.header("authorization");

    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing authorization header",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    // token decode
    const decodedToken = jwt.verify(token, process.env.jwt_secret);

    if (!decodedToken || !decodedToken.userID) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    req.body.userId = decodedToken.userID;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      success: false,
      message: `Unauthorized: ${error.message}`,
    });
  }
};
