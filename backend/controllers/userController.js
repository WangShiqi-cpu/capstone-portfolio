// ============================================================
// controllers/userController.js  —  User business logic
// Lab-13: registration (bcrypt hashing via pre-save hook).
// Lab-14 Step 3: login controller (verify + issue JWT).
// ============================================================

const User = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler');
const generateToken = require('../utils/generateToken');

// ============================================================
// POST /api/users/register  —  Register a new user
// ============================================================
exports.registerUser = async (req, res, next) => {
    try {
        // The req.body contains username, email, and plaintext password
        const { username, email, password } = req.body;

        // Mongoose pre-save hook handles the hashing automatically!
        const newUser = await User.create({ username, email, password });

        // IMPORTANT: Never send the hash back to the client!
        res.status(201).json({
            success: true,
            user: { username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        // Handle duplicate key errors (unique: true on email/username) as a 400
        if (error.code === 11000) {
            return next(
                new ErrorHandler('User with this email or username already exists', 400)
            );
        }
        next(error); // Pass other errors to the central handler
    }
};

// ============================================================
// POST /api/users/login  —  Login an existing user (Lab-14 Step 3)
// ============================================================
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Force Mongoose to include the password hash (it has select: false)
        const user = await User.findOne({ email }).select('+password');

        // Generic 401 whether the user doesn't exist or the password is wrong
        if (!user || !(await user.matchPassword(password))) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        res.status(200).json({
            success: true,
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        next(error);
    }
};
