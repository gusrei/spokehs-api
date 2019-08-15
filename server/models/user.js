const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;


let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'The name is mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is mandatory']
    },
    password: {
        type: String,
        required: [true, 'The password is mandatory']
    },
    isProfileFulFilled: {
        type: Boolean,
        default: false,
    },
    signedIn: {
        type: Boolean,
        default: false,
    }
});


userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });


module.exports = mongoose.model('User', userSchema);