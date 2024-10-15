const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

// Add a new task
router.post('/add', async (req, res) => {
    const taskName = req.body.taskName;
    await Task.create({ name: taskName });
    res.redirect('/');
});

// Mark task as completed/incomplete
router.post('/toggle-complete/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.redirect('/');
});

// Edit task (render form)
router.get('/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task });
});

// Update task name
router.post('/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.name = req.body.taskName;
    await task.save();
    res.redirect('/');
});

// Delete task
router.post('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
