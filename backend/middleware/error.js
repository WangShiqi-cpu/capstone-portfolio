// ============================================================
// middleware/error.js  —  Centralized error handler (Lab-12, Step 3)
// This runs when an error is passed via next(error).
// ============================================================

/**
 * Centralized error handler middleware.
 * This runs when an error is passed via next(error).
 * NOTE: Express identifies it as an error handler because it takes
 * exactly four arguments (err, req, res, next).
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    // Use the status code from the error object, or default to 500
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // ------------------------------------------------------------
    // Challenge 1: Handle Mongoose CastError (invalid ID format)
    // ------------------------------------------------------------
    if (err.name === 'CastError') {
        err.message = `Resource not found. Invalid ID format.`;
        err.statusCode = 400;
    }

    // ------------------------------------------------------------
    // Handle Mongoose ValidationError (schema rules violated) -> 400
    // ------------------------------------------------------------
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
    }

    // ------------------------------------------------------------
    // Send the final, consistent JSON response
    // ------------------------------------------------------------
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode,
        message: err.message,
        // Challenge 2: NEVER send the stack trace in production.
        // Only include it while NODE_ENV is 'development'.
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandlerMiddleware;
