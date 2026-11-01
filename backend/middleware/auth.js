// ============================================================
// middleware/auth.js  —  JWT "protect" middleware (Capstone)
// Verifies the Bearer token, loads the user onto req.user.
// ============================================================
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.protect = async (req, res, next) => {
    let token;

    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) {
        token = auth.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorHandler('Not authorized: no token provided', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user (without password) to req
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return next(new ErrorHandler('User no longer exists', 401));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler('Not authorized: invalid or expired token', 401));
    }
};
