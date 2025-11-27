const express = require('express');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express(); // <-- MUST be defined before using app

// Debug log
console.log("Starting server...");

// Parse JSON bodies
app.use(express.json());

// Trim URLs to remove accidental newlines/spaces
app.use((req, res, next) => {
    req.url = req.url.trim();
    next();
});

// Root route
app.get("/", (req, res) => res.send("SERVER ROOT WORKING"));

// Mount routers
app.use("/customer", customer_routes);
app.use("/books", genl_routes);

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
