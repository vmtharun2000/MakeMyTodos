const validators = {
    isValidUsername: (username) => /^[a-zA-Z0-9_]+$/.test(username),
    isValidEmail: (email) => /^\S+@\S+\.\S+$/.test(email),
    isValidPassword: (password) => {
        const passwordRegex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/;
        return passwordRegex.test(password);
    },
    isValidPhoneNumber: (phoneNumber) => /^[0-9]+$/.test(phoneNumber),
    isValidAddress: (address) => typeof address === "object" && address !== null,
    isEmpty: (data) => !data,
    isValidTimestamp: (timestamp) => {
        const numericTimestamp = Number(timestamp);
        if (isNaN(numericTimestamp)) return false;
        const date = new Date(numericTimestamp);
        return !isNaN(date.getTime());
    },
};

module.exports = validators;
