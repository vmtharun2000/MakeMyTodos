const express = require("express");
const validator = require("../middleware/ValidateProfile");
const profile = require("../controllers/Profile");

const router = express.Router();

router
    .post("/signUp", validator.validateSignUp, profile.signUp)
    .post("/signIn", validator.validateSignIn, profile.signIn);

module.exports = router;
