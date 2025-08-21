const axios = require('axios');
const bcrypt = require('bcrypt');
const validateSignupData = require('../utils/validation.js');
const User = require('../model/user.model.js');



const signupController = async (req, res) => {
    try {
        // TODO Validating data coming from req.body
        validateSignupData(req);

        // TODO Destructuring from req.body
        const { name, email, password, preferences } = req.body;

        // TODO Finding if the email already in use or not
        const existedUser = await User.findOne({ email });
        if (existedUser)
            return res.status(400).json({ message: 'User already existed. Please login.' });

        // TODO Making a Hash Password
        const hashPass = await bcrypt.hash(password, 10);

        // TODO Making a new User
        const newUser = await new User({ name, email, password: hashPass, preferences: preferences || [] });

        // TODO Saving it in the DB
        await newUser.save();
        return res.status(200).json({ message: 'New user added to the DB' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const loginController = async (req, res) => {
    try {
        // TODO Destructuring from req.body
        const { email, password } = req.body;

        // TODO Validating data coming from req.body
        if (!email || !password)
            return res.status(400).json({ message: 'All the fields required' });

        // TODO Finding if the User already exist or not
        const existedUser = await User.findOne({ email });
        if (!existedUser)
            return res.status(400).json({ message: "User doesn't exist. Please register first" });

        // TODO Password is valid or not
        const isValidPassword = await bcrypt.compare(password, existedUser.password);
        if (isValidPassword) {
            // TODO Injecting JWT token
            const token = await existedUser.getJWT();
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const userPreferences = async (req, res) => {
    try {
        // TODO Destructuring preferences field from req.user
        const { preferences } = req.user;

        if (!preferences)
            return res.status(400).json({ message: 'No preferences' });
        return res.status(200).json({ preferences });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const updatePreferences = async (req, res) => {
    try {
        // TODO Destructuring preferences field from req.body
        const { preferences } = req.body;

        // TODO Getting logged-in user from req.user
        const loggedInUser = req.user;

        // TODO Checking preferences is an Array or not
        if (!preferences || !Array.isArray(preferences)) {
            return res.status(400).json({ message: 'Preferences must be an array' });
        }

        // TODO Updating preferences field
        loggedInUser.preferences = preferences;

        // TODO Saving the new preferences in the DB
        await loggedInUser.save();
        return res.status(200).json({ preferences: loggedInUser.preferences });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const newsPreferences = async (req, res) => {
    try {
        // TODO Destructuring preferences field from req.user
        const { preferences } = req.user;

        // TODO Checking preferences available or not
        if (!preferences || preferences.length === 0)
            return res.status(400).json({ message: 'NO preferences found' });

        // TODO Feting news results according to the preferences topics
        let newsResults = [];
        for (let topic of preferences) {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: topic,
                    from: '2025-08-12',
                    sortBy: 'popularity',
                    apiKey: '0d8f03b553d946bcb1a287ff96ce2fcd'
                }
            });

            // TODO Pushing the fetched data in the array
            newsResults.push({ topic, articles: response.data.articles });
        }
        return res.status(200).json({ news: newsResults });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    signupController,
    loginController,
    userPreferences,
    updatePreferences,
    newsPreferences
}