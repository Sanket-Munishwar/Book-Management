const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookCover:{
        type:String
    },
    title: {
        type: String,
        required: false,
        unique: true,
        lowercase:true,
        trim:true
    },
    excerpt: {
        type: String,
        required: false,
        lowercase:true,
        trim:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    ISBN: {
        type: String,
        required: false,
        unique: true,
    },
    category: {
        type: String,
        required: false,
        lowercase:true,
        trim:true
    },
    subcategory: {
        type: String,
        required: false,
        lowercase:true,
        trim:true
    },
    reviews: {
        type: Number,
        default: 0,
        comment: 'Holds number of reviews of this book',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    releasedAt: {
        type: Date,
        required: false,
        format: 'YYYY-MM-DD',
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);