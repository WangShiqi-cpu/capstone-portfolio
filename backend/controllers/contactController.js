// ============================================================
// controllers/contactController.js  —  Portfolio contact form
// ============================================================
const Message = require('../models/Message');

// POST /api/contact — public
exports.createMessage = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const saved = await Message.create({ name, email, message });
        res.status(201).json({ success: true, data: saved });
    } catch (error) {
        next(error);
    }
};
