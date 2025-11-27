const express = require('express');
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
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
