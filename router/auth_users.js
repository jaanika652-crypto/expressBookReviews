const express = require('express');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const regd_users = express.Router();
const books = require('./booksdb.js');

let users = []; // { username, password }

// Helpers
const isValid = (username) => !users.some(user => user.username === username);
const authenticatedUser = (username, password) =>
    users.some(user => user.username === username && user.password === password);

// ----------------------------
// Task 6: Register
// ----------------------------
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "Username and password are required." });

    if (!isValid(username))
        return res.status(409).json({ message: "Username already exists. Please choose another one." });

    users.push({ username, password });
    console.log("Registered users:", users);
    return res.status(201).json({ message: `User '${username}' registered successfully.` });
});

// ----------------------------
// Task 7: Login
// ----------------------------
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "Username and password required." });

    if (!authenticatedUser(username, password))
        return res.status(401).json({ message: "Invalid username or password." });

    const accessToken = jwt.sign({ username }, "fingerprint_customer", { expiresIn: "1h" });
    req.session.authorization = { accessToken, username };

    return res.status(200).json({
        message: `User '${username}' logged in successfully.`,
        accessToken
    });
});

// ----------------------------
// Task 8: Add/Modify review
// ----------------------------
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn.trim();
    const review = req.query.review;

    if (!req.session || !req.session.authorization)
        return res.status(401).json({ message: "You must be logged in to add a review." });

    const username = req.session.authorization.username;

    if (!books[isbn])
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found.` });

    if (!review)
        return res.status(400).json({ message: "Review text is required in the query parameter." });

    books[isbn].reviews[username] = review;

    return res.status(200).json({
        message: "Review added/modified successfully.",
        reviews: books[isbn].reviews
    });
});

// ----------------------------
// Task 9: Delete review
// ----------------------------
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn.trim();

    if (!req.session || !req.session.authorization)
        return res.status(401).json({ message: "You must be logged in to delete a review." });

    const username = req.session.authorization.username;

    if (!books[isbn])
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found.` });

    if (!books[isbn].reviews[username])
        return res.status(404).json({ message: "No review by this user to delete." });

    delete books[isbn].reviews[username];

    return res.status(200).json({
        message: "Your review has been deleted successfully.",
        reviews: books[isbn].reviews
    });
=======
const regd_users = express.Router();

// Users array
let users = []; // { username, password }

// Check if username is valid (not already taken)
const isValid = (username) => !users.some(user => user.username === username);

// Check if username and password match
const authenticatedUser = (username, password) => users.some(user => user.username === username && user.password === password);

// Register a new user
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    if (!isValid(username)) {
        return res.status(409).json({ message: "Username already exists. Please choose another one." });
    }

    users.push({ username, password });
    return res.status(201).json({ message: `User '${username}' registered successfully.` });
});

// Placeholder login
regd_users.post("/login", (req, res) => {
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Placeholder review
regd_users.put("/auth/review/:isbn", (req, res) => {
    return res.status(300).json({ message: "Yet to be implemented" });
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
