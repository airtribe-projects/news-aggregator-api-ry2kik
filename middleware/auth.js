const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');

const userAuth = async (req, res, next) => {
    try {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ message: 'Authentication required' });
        const decoded = await jwt.verify(token, 'secret');
        const { _id } = decoded;
        const user = await User.findOne({ _id });
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error in authenticating user: ' + error });
    }
}

module.exports = userAuth;