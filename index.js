const express = require('express');
const session = require('express-session');
const path = require('path');

const customer_routes = require(path.join(__dirname, 'router', 'auth_users.js')).authenticated;
const genl_routes = require(path.join(__dirname, 'router', 'general.js')).general;

const app = express();

// Parse JSON bodies
app.use(express.json());

// Session middleware – applied globally
app.use(session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Trim URLs
app.use((req, res, next) => {
    req.url = req.url.trim();
    next();
});

// Debug log for incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Root route
app.get("/", (req, res) => res.send("SERVER ROOT WORKING"));

// Mount routers
app.use("/customer", customer_routes);
app.use("/books", genl_routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
