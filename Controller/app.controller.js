const validateSignupData = require('../utils/validation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [];

const getUsers = (req, res) => {
    try {
        if (users.length <= 0) {
            throw new Error("No users found");
        }
        else {
            res.status(200).json({ message: 'Fetching the users data: ', users });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error in retriving data: ', error });
    }
}

const signupController = async (req, res) => {
    try {
        // Validating user's sign-up data
        validateSignupData(req);
        
        // Destructuring req.body data
        const { name, email, password, preferences } = req.body;
        const existedUser = users.find(user => user.email == email);
        if (existedUser)
            return res.status(400).json({ message: 'User already existed. Please login.' });
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = { name, email, password: hashPass, preferences: preferences || [] };
        users.push(newUser);
        res.status(200).json({ message: 'User added successfully', newUser });
    } catch (error) {
        res.status(400).send('Error in saving user data: ' + error);
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            res.status(400).json({ message: 'All the fields required' });

        const existedUser = users.find(user => user.email == email);
        if (!existedUser)
            res.status(400).json({ message: "User doesn't exist. Please register first" });

        const isValidPassword = await bcrypt.compare(password, existedUser.password);
        if (!isValidPassword) 
            res.status(400).json({ message: 'Incorrect password' });

        const token = await jwt.sign({ email: existedUser.email }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'User logged in successfully', existedUser, token })
    } catch (error) {
        res.status(400).send('Error in logging user data: ' + error);
    }
}

module.exports = {
    getUsers, signupController, loginController
}