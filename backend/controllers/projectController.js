// ============================================================
// controllers/projectController.js  —  Portfolio projects CRUD
// ============================================================
const Project = require('../models/Project');
const ErrorHandler = require('../utils/ErrorHandler');

// GET /api/projects — public
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort('-createdAt');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

// GET /api/projects/:id — public
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return next(new ErrorHandler('Project not found', 404));
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// POST /api/projects — protected, admin only
exports.createProject = async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// PUT /api/projects/:id — protected
exports.updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return next(new ErrorHandler('Project not found', 404));

        // admin-only: any logged-in user can update (per spec)
        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/projects/:id — protected
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return next(new ErrorHandler('Project not found', 404));
        await project.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
