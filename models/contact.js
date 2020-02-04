/*
    Although MongoDB is a no SQL database, i.e. it doesn't require Schemas, it is good idea to create Schemas
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: 'No email available'
    },
    phone: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('contacts', ContactSchema);

