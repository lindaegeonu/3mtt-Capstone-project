//utils/validation.js

const mongoose = require("mongoose");

// Validate an email address
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Validate if a string is a valid MongoDB ObjectId
const validateObjectId = (string) => {
    return mongoose.Types.ObjectId.isValid(string);
};

module.exports = {
    validateEmail,
    validateObjectId,
};
