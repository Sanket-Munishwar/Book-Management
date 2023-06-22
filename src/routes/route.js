const router = require('express').Router();
const { createBook,getBooks, getBooksById, updateBooks, deleteBookById } = require('../controllers/bookController');
const { reviewBook, updateBookReview, deleteReviewById } = require('../controllers/reviewController');
const { createUser, loginUser } = require('../controllers/userController');
const { isAuthentication } = require('../middleware/auth');




//=======================user routes======================
router.post("/register", createUser)
router.post('/login', loginUser)


//======================= Book routes======================

router.post('/books', isAuthentication, createBook)
router.get('/books',isAuthentication, getBooks)
router.get('/books/:bookId',isAuthentication,  getBooksById)
router.put('/books/:bookId',isAuthentication,  updateBooks)
router.delete('/books/:bookId', isAuthentication, deleteBookById)

// // ===================== review routes ====================

router.post('/books/:bookId/review', reviewBook)
router.put('/books/:bookId/review/:reviewId', updateBookReview)
router.delete('/books/:bookId/review/:reviewId', deleteReviewById)

module.exports = router