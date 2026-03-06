const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query;
    if (req.user.role === 'ADMIN') {
      query = Task.find().populate('assignedTo', 'name email').populate('createdBy', 'name email');
    } else {
      query = Task.find({ assignedTo: req.user.id }).populate('createdBy', 'name email');
    }

    const tasks = await query;
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email').populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.assignedTo._id.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private (Admin Only)
const createTask = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Only admins can create tasks' });
    }

    const { title, description, assignedTo, status } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status: status || 'PENDING',
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Admin can update everything, User can only update status
    if (req.user.role === 'ADMIN') {
      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }
      // Restrict user to only update status
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, message: 'Only status update is allowed for users' });
      }
      task = await Task.findByIdAndUpdate(req.params.id, { status }, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private (Admin Only)
const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Only admins can delete tasks' });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
