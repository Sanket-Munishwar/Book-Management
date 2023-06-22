const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss'],
        required: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        lowercase:true,
        trim:true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15,
    },
    address: {
        street: {
            type: String,
            lowercase:true,
            trim:true
        },
        city: {
            type: String,
            lowercase:true,
            trim:true
        },
        pincode: {
            type: String,
            lowercase:true,
            trim:true
        },
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);