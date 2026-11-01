// ============================================================
// utils/ErrorHandler.js  —  Custom Error Class (Lab-12, Step 1)
// Standardized, reusable tool to create application-specific
// errors with appropriate HTTP status codes.
// ============================================================

/**
 * Custom error class used to standardize error responses.
 * When thrown, it ensures a message and a status code are available
 * for the central Express error handler.
 */
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture the stack trace to help with debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
