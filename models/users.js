/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 30-03-2021
 * @desc UserSchema
 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    interestedin: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Users', userSchema);