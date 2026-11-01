// ============================================================
// models/UserModel.js  —  Mongoose User Model
// Lab-13: bcrypt pre-save hashing hook.
// Lab-14 Step 1: matchPassword instance method for login.
// ============================================================

const mongoose = require('mongoose');
// bcrypt (native) is preferred; bcryptjs is a drop-in pure-JS fallback
// providing the identical genSalt / hash API used below.
const bcrypt = (() => {
    try { return require('bcrypt'); }
    catch { return require('bcryptjs'); }
})();

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
        },
        // 'select: false' prevents the password hash from being returned
        // by default queries.
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
            // Capstone spec: minlength 6
            minlength: [6, 'Password must be at least 6 characters long']
        }
    },
    {
        timestamps: true
    }
);

// ------------------------------------------------------------
// Challenge 2: Email Sanitization
// Setter converts the email to lowercase before saving, so
// 'user@Example.com' and 'user@example.com' are the same account.
// ------------------------------------------------------------
userSchema.path('email').set(function (value) {
    return value.toLowerCase();
});

// ------------------------------------------------------------
// Mongoose Pre-Save Middleware: Hash password BEFORE saving to DB
// ------------------------------------------------------------
userSchema.pre('save', async function (next) {
    // Only hash if the password field has been modified (e.g., on registration)
    if (!this.isModified('password')) {
        return next();
    }

    // Generate salt and hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// ------------------------------------------------------------
// Lab-14 Step 1: Instance method to compare a plaintext password
// with the stored bcrypt hash. Called from the login controller
// after forcing Mongoose to select(+password).
// ------------------------------------------------------------
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
