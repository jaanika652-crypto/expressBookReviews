const express = require('express');
<<<<<<< HEAD
const axios = require('axios'); // Optional, following lab style
=======
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
let books = require("./booksdb.js");

const public_users = express.Router();

<<<<<<< HEAD
// ----------------------------
// Task 10: Get all books using async/await
// ----------------------------
public_users.get('/', async (req, res) => {
    try {
        const getBooks = () => new Promise((resolve, reject) => {
            if (books) resolve(books);
            else reject("No books available");
        });

        const allBooks = await getBooks();
        return res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books", error });
    }
});

// ----------------------------
// Task 11: Get book by ISBN using async/await
// ----------------------------
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn.trim();

        const getBookByISBN = (isbn) => new Promise((resolve, reject) => {
            if (books[isbn]) resolve(books[isbn]);
            else reject(`Book with ISBN ${isbn} not found.`);
        });

        const book = await getBookByISBN(isbn);
        return res.status(200).json(book);

    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// ----------------------------
// Task 12: Get book by author using async/await
// ----------------------------
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.trim();

        const getBooksByAuthor = (author) => new Promise((resolve, reject) => {
            const results = Object.values(books).filter(b => b.author === author);
            if (results.length > 0) resolve(results);
            else reject(`No books found by author "${author}".`);
        });

        const results = await getBooksByAuthor(author);
        return res.status(200).json(results);

    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// ----------------------------
// Task 13: Get book by title using async/await
// ----------------------------
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title.trim();

        const getBooksByTitle = (title) => new Promise((resolve, reject) => {
            const results = Object.values(books).filter(b => b.title === title);
            if (results.length > 0) resolve(results);
            else reject(`No books found with title "${title}".`);
        });

        const results = await getBooksByTitle(title);
        return res.status(200).json(results);

    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// ----------------------------
// Get book reviews (still synchronous)
// ----------------------------
=======
// Get all books
public_users.get('/', (req, res) => res.status(200).send(JSON.stringify(books, null, 4)));

// Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn.trim();
    if (books[isbn]) return res.status(200).json(books[isbn]);
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found.` });
});

// Get book by author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.trim();
    const results = Object.values(books).filter(b => b.author === author);
    if (results.length > 0) return res.status(200).json(results);
    return res.status(404).json({ message: `No books found by author "${author}".` });
});

// Get book by title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.trim();
    const results = Object.values(books).filter(b => b.title === title);
    if (results.length > 0) return res.status(200).json(results);
    return res.status(404).json({ message: `No books found with title "${title}".` });
});

// Get book reviews
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn.trim();
    if (books[isbn]) {
        const book = books[isbn];
        return res.status(200).json({
            author: book.author,
            title: book.title,
            reviews: book.reviews
        });
    }
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found.` });
});

<<<<<<< HEAD
module.exports.general = public_users;
=======
module.exports.general = public_users;
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
