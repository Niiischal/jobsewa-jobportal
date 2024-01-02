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
        const decryptedToken = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decryptedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Unauthorized: ${error.message}`,
        });
    }
};
