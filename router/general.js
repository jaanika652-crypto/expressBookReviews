const express = require('express');
let books = require("./booksdb.js");

const public_users = express.Router();

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

module.exports.general = public_users;