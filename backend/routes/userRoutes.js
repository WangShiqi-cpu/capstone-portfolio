// ============================================================
// routes/userRoutes.js  —  User route definitions (Lab-11 Challenge 1)
// Mounted in server.js at /api/users
// ============================================================

const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

// POST /api/users/register
router.post('/register', registerUser);

// Lab-14 Step 4: POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
