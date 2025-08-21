const validator = require('validator');

const validateSignupData = (req) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        throw new Error('Fill up all the fields');
    if (!validator.isEmail(email))
        throw new Error('Not a valid email');
    if (!validator.isStrongPassword(password))
        throw new Error('Not a strong password');
}

module.exports = validateSignupData;