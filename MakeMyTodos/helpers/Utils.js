const uid = require("uid");
const jwt = require("jsonwebtoken");
const key = require('../key');

const accessTokenExpiry = "15m";
const secretKey = key.secretKey;

module.exports = {
    generateUserId: () => {
        const id = uid.uid(16);
        const preWord = "User";
        return preWord + id;
    },
    generateTodoId: () => {
        const id = uid.uid(16);
        const preWord = "Todo";
        return preWord + id;
    },
    generateAccessToken: (data) => {
        return jwt.sign({ data }, secretKey, { expiresIn: accessTokenExpiry });
    },
};
