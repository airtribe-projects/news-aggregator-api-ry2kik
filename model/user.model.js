const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },
    
    preferences: {
        type: Array,
        required: false,
        default: []
    }
});

userSchema.methods.getJWT = async function() {
    const token = await jwt.sign({ _id: this._id }, 'secret', { 
        expiresIn: '1h' 
    });
    return token;
}

module.exports = mongoose.model('User', userSchema);