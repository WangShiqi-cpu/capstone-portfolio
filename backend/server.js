// ============================================================
// server.js  —  Entry point (Capstone)
// ============================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./db');
const ErrorHandler = require('./utils/ErrorHandler');
const errorHandlerMiddleware = require('./middleware/error');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Security + Middleware --------------------
app.use(helmet());
app.use(cors());
app.use(express.json());

// -------------------- Routes --------------------
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Portfolio & Blog API is running' });
});

// -------------------- 404 + Central Error --------------------
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandlerMiddleware);

// -------------------- Start --------------------
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Endpoints:');
        console.log('  POST   /api/users/register');
        console.log('  POST   /api/users/login');
        console.log('  GET    /api/projects   /  POST /api/projects   /  PUT|DELETE /api/projects/:id');
        console.log('  GET    /api/blog       /  POST /api/blog       /  PUT|DELETE /api/blog/:id');
        console.log('  GET/POST /api/blog/:postId/comments');
        console.log('  POST   /api/contact');
    });
});
