const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },  
    fullname: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    address: {
        landmark: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    profileImage: {
        type: String, // Assuming you store the image URL
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("profile", ProfileSchema);
