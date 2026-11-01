// ============================================================
// utils/generateToken.js  —  JWT utility (Lab-14 Step 2)
// Signs a user id into a JWT that expires in 30 days.
// The secret is loaded from process.env.JWT_SECRET.
// ============================================================

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const payload = { id: userId };
    const options = { expiresIn: '30d' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = generateToken;
