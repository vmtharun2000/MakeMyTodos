const validator = require("../helpers/Validators");

module.exports = {
    validateSignUp: (req, res, next) => {
        const errors = [];

        const {
            username,
            email,
            password,
            fullname,
            dateOfBirth,
            phoneNumber,
            address,
        } = req.body;

        if (!validator.isValidUsername(username))
            errors.push({
                field: "username",
                message: "Username is required and space not allowed",
            });

        if (!validator.isValidEmail(email))
            errors.push({
                field: "email",
                message: "Invalid email format or email is missing",
            });

        if (!validator.isValidPassword(password))
            errors.push({
                field: "password",
                message: "Password is required or Invalid character",
            });

        if (validator.isEmpty(fullname))
            errors.push({ field: "fullname", message: "Fullname is required" });

        if (!validator.isValidDate(dateOfBirth))
            errors.push({
                field: "dateOfBirth",
                message: "Invalid date of birth format or date of birth is missing",
            });

        if (!validator.isValidPhoneNumber(phoneNumber))
            errors.push({
                field: "phoneNumber",
                message: "Invalid phone number format or phone number is missing",
            });

        if (!validator.isValidAddress(address))
            errors.push({
                field: "address",
                message: "Invalid address format or address is missing",
            });

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },
    validateSignIn: (req, res, next) => {
        const errors = [];
        const { userValue } = req.body;
        let isValid = false;

        if (userValue) {
            if (validator.isValidPhoneNumber(userValue)) isValid = true;
            if (validator.isValidEmail(userValue)) isValid = true;
            if (validator.isValidUsername(userValue)) isValid = true;
            if (!isValid)
                errors.push({
                    field: "userValue",
                    message: "Not an phone Number || email || username",
                });
        } else
            return res.status(400).send({
                error: true,
                message: "No data available",
            });

        next();
    },
};
