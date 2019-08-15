const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;


let profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'The userId name is mandatory']
    },
    firstName: {
        type: String,
        required: [true, 'The first name is mandatory']
    },
    lastName: {
        type: String,
        required: [true, 'The last name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'The email is mandatory']
    },
    annualIncome: {
        type: Number,
        required: [true, 'The annual income is mandatory']
    },
    numberOfOccupants: {
        type: Number,
        required: [true, 'The number of Occupants is mandatory']
    },
    phone: {
        type: Number,
        required: [true, 'The number current phone is mandatory']
    },
    workPhone: {
        type: Number,
    },
    streetAddress: {
        type: String,
        required: [true, 'The street address is mandatory']
    },
    city: {
        type: String,
        required: [true, 'The city is mandatory']
    },
    zipcode: {
        type: String,
        required: [true, 'The zipcode is mandatory']
    },
    bedroomOptions: {
        type: Array,
        required: [true, 'The bedroomOptions is mandatory']
    }
});



module.exports = mongoose.model('Profile', profileSchema);