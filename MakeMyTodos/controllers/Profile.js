const Profile = require("../models/Profile");
const generateId = require("../helpers/Utils");
const utils = require("../helpers/Utils");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signUp = (req, res) => {
    try {
        const {
            username,
            email,
            password,
            fullname,
            dateOfBirth,
            phoneNumber,
            address,
            profileImage,
        } = req.body;

        Profile.findOne({ $or: [{ username }, { email }, { phoneNumber }] }).then(
            (result) => {
                if (result)
                    return res.status(500).send({
                        error: true,
                        message: "already available data",
                    });

                bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
                    if (err)
                        return res.status(500).send({
                            error: true,
                            message: err.message,
                        });

                    const userId = generateId.generateUserId();
                    const newProfile = new Profile({
                        userId: userId,
                        username: username,
                        email: email,
                        password: hashedPassword,
                        fullname: fullname,
                        dateOfBirth: new Date(dateOfBirth),
                        phoneNumber: phoneNumber,
                        address: address,
                        profileImage: profileImage,
                        isActive: true,
                    });

                    newProfile.save().then(() =>
                        res.status(200).send({
                            error: false,
                            message: "Profile created: " + userId,
                        })
                    );
                });
            }
        );
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message,
        });
    }
};

const signIn = (req, res) => {
    try {
        const { userValue, password } = req.body;
        
        Profile.findOne({
            $or: [
                { username: userValue },
                { email: userValue },
                { phoneNumber: userValue },
            ],
        }).then((result) => {
            if (result)
                bcrypt.compare(password, result.password).then((result) => {
                    if (result) {
                        const accessToken = utils.generateAccessToken(userValue);
                        return res.status(200).send({
                            error: false,
                            message: "SignedIn Successfully",
                            data: {
                                accessToken,
                            },
                        });
                    }
                    return res.status(500).send({
                        error: true,
                        message: "Invalid password",
                    });
                });
            else
                return res.status(500).send({
                    error: true,
                    message: "Invalid user data",
                });
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message,
        });
    }
};

module.exports = {
    signUp,
    signIn,
};
