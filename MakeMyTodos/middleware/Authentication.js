const jwt = require("jsonwebtoken");
const key = require('../key');
const secretKey = key.secretKey;

module.exports = {
    authenticateToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token)
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
            });

        jwt.verify(token, secretKey, (err, user) => {
            if (err)
                return res.status(403).json({
                    error: true,
                    message: "InvalidToken",
                });

            req.user = user;
            next();
        });
    },
};
