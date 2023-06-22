
const validator = require('validator');
const { ObjectIdCheck, userCheck, bookCheck } = require('../validations/verifications');
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");


const createBook = async (req, res) => {
    try {
        const { title, excerpt, releasedAt, userId, subcategory, category, ISBN } = req.body
        if (!title || !excerpt || !userId || !subcategory || !category || !ISBN || !releasedAt) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }
        if (title && typeof title != "string") {
            return res.status(400).send({ status: false, message: "Title must be in string" });
        }
        if (!title || !title.trim()) {
            return res.status(400).send({ status: false, message: "Title must be present in body and can't be empty." });
        }
        if (!excerpt || !excerpt.trim()) {
            return res.status(400).send({ status: false, message: " Excerpt must be present in body and can't be empty." });
        }
        if (excerpt && typeof excerpt != "string") {
            return res.status(400).send({ status: false, message: "Excerpt must be in string" });
        }
        if (ISBN && typeof ISBN != "string") {
            return res.status(400).send({ status: false, message: "ISBN must be in string" });
        }
        if (category && typeof category != "string") {
            return res.status(400).send({ status: false, message: "category must be in string" });
        }
        if (!category || !category.trim()) {
            return res.status(400).send({ status: false, message: "Category must be present in body and can't be empty." });
        }
        if (subcategory && typeof subcategory != "string") {
            return res.status(400).send({ status: false, message: "subcategory must be in string" });
        }
        if (!subcategory || !subcategory.trim()) {
            return res.status(400).send({ status: false, message: "Subategory must be present in body and can't be empty." });
        }
        if (releasedAt && typeof releasedAt != "string") {
            return res.status(400).send({ status: false, message: "releasedAt must be in string" });
        }
        if (!releasedAt || !releasedAt.trim()) {
            return res.status(400).send({ status: false, message: "releasedAt must be present in body and can't be empty." });
        }
        if (!ObjectIdCheck(userId)) {
            return res.status(400).json({ status: false, message: 'User Id is invalid' });
        }
        if (!validator.isISBN(ISBN)) {
            return res.status(400).json({ status: false, message: 'ISBN is invalid' });
        }
        const titleBook = await bookModel.findOne({ title: title });
        if (titleBook) {
            return res.status(400).json({ status: false, message: 'Title already exists' });
        }
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ status: false, message: 'User does not exist' });
        }
        else {
            const IsbnBook = await bookModel.findOne({ ISBN: ISBN });
            if (IsbnBook) {
                return res.status(400).json({ status: false, message: 'ISBN already exists' });
            }
            else {
                const book = await bookModel.create(req.body)
                res.status(201).json({ status: true, data: book });
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}



const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find({ ...req.query, isDeleted: false }).sort({ name: 1 });
        if (books.length == 0) {
            return res.status(404).json({ status: false, message: 'No books found' });
        }
        res.status(200).json({ status: true, message: 'Books list', data: books });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}


const getBooksById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        if (!ObjectIdCheck(bookId)) {
            return res.status(400).json({ status: false, message: 'Book Id is invalid' });
        }
        const book = await bookModel.findById(bookId)
        if (!book) {
            return res.status(404).json({ status: false, message: 'Book does not exist' });
        }
        const reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false });
        book.reviewsData = reviewsData;
        res.status(200).json({ status: true, data: book });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const updateBooks = async function (req, res) {
    try {
        let BookID = req.params.bookId;
        let data = req.body;

        const { title, excerpt, ISBN, releasedAt } = data;

        if (Object.keys(data).length != 0) {

            if (!title && !excerpt && !ISBN && !releasedAt) {
                return res.status(400).send({ status: false, message: "At least one field is required." });
            }

            let updateData = {};

            if (title) {
                if (title && typeof title != "string") {
                    return res.status(400).send({ status: false, message: "Title must be in string" });
                }
                if (!title.trim()) {
                    return res.status(400).send({ status: false, message: "Title can not be empty." });
                }
                let trimTitle = title.toLowerCase().trim();
                const checkTitle = await bookModel.findOne({ title: trimTitle });
                if (checkTitle) {
                    return res.status(400).send({ status: false, message: `The title ${trimTitle} is already is in use for a Book.Try another one.` });
                }
                updateData.title = trimTitle;
            }

            if (excerpt) {
                if (excerpt && typeof excerpt != "string") {
                    return res.status(400).send({ status: false, message: "excerpt must be in string" });
                }
                if (!excerpt.trim()) {
                    return res.status(400).send({ status: false, message: "Excerpt can not be empty." });
                }
                let trimExcerpt = excerpt.trim();
                updateData.excerpt = trimExcerpt;
            }

            if (ISBN) {
                if (ISBN && typeof ISBN != "string") {
                    return res.status(400).send({ status: false, message: "ISBN must be in string" });
                }
                if (!ISBN.trim()) {
                    return res.status(400).send({ status: false, message: "ISBN can not be empty." });
                }
                let trimISBN = ISBN.trim();
                if (!validateISBN(trimISBN)) {
                    return res.status(400).send({ status: false, message: " Invalid ISBN number it should contain only 13 digits" });
                }
                const checkISBN = await bookModel.findOne({ ISBN: trimISBN });
                if (checkISBN) {
                    return res.status(400).send({ status: false, message: `The ISBN ${trimISBN} is already is in use for a Book.Try another one.` });
                }
                updateData.ISBN = trimISBN;
            }

            if (releasedAt) {
                if (releasedAt && typeof releasedAt != "string") {
                    return res.status(400).send({ status: false, message: "releasedAt must be in string" });
                }
                let trimReleasedAt = releasedAt.trim();
                if (moment(trimReleasedAt, "YYYY-MM-DD").format("YYYY-MM-DD") !== trimReleasedAt) {
                    return res.status(400).send({ status: false, message: "Please enter the Date in the format of 'YYYY-MM-DD'." });
                }
                updateData.releasedAt = trimReleasedAt;
            }

            const updateBookDetails = await bookModel.findOneAndUpdate(
                { _id: BookID, isDeleted: false },
                updateData,
                { new: true }
            );

            if (!updateBookDetails) {
                return res.status(404).send({ status: false, message: "No data found for updation." });
            }

            return res.status(200).send({ status: true, message: "Success", data: updateBookDetails });
        } else {
            return res.status(400).send({ status: false, message: "Invalid request, body can't be empty." });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        if (!ObjectIdCheck(bookId)) {
            return res.status(400).json({ status: false, message: 'Book Id is invalid' });
        }
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) {
            return res.status(404).json({ status: false, message: 'Book does not exist' });
        }
        if (book.userId != req.userId) {
            return res.status(403).json({ status: false, message: 'Access denied' });
        }
        const deleteBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        res.status(200).json({ status: true, message: "Delete book Successfully" });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ status: false, message: error.message });
        }
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports= {createBook, getBooks,getBooksById,updateBooks,deleteBookById}