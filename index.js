const express = require('express');
const session = require('express-session');
<<<<<<< HEAD
const path = require('path');

const customer_routes = require(path.join(__dirname, 'router', 'auth_users.js')).authenticated;
const genl_routes = require(path.join(__dirname, 'router', 'general.js')).general;

const app = express();
=======

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express(); // <-- MUST be defined before using app

// Debug log
console.log("Starting server...");
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4

// Parse JSON bodies
app.use(express.json());

<<<<<<< HEAD
// Session middleware – applied globally
app.use(session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Trim URLs
=======
// Trim URLs to remove accidental newlines/spaces
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
app.use((req, res, next) => {
    req.url = req.url.trim();
    next();
});

<<<<<<< HEAD
// Debug log for incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

=======
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
// Root route
app.get("/", (req, res) => res.send("SERVER ROOT WORKING"));

// Mount routers
app.use("/customer", customer_routes);
app.use("/books", genl_routes);

<<<<<<< HEAD
// Start server
const PORT = process.env.PORT || 5000;
=======
// Session + auth middleware for protected routes
app.use("/customer/auth/*", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

app.use("/customer/auth/*", (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) return res.status(401).json({ message: "Access token missing. Please login." });
    if (!req.session || !req.session.authorization) return res.status(401).json({ message: "Session expired. Please login again." });
    const sessionToken = req.session.authorization.accessToken;
    if (accessToken !== sessionToken) return res.status(403).json({ message: "Invalid access token." });
    next();
});

// Start server
const PORT = 5000;
>>>>>>> 20145b9cbcf40ee6dc36c8eca2d06237ecd7d4e4
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
