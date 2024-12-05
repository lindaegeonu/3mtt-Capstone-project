//controllers/taskControllers.js

const Task = require("../models/tasks");
const { validateObjectId } = require("../utils/validation");


exports.getTasks = async (req, res) => {
    try {
        // Fetch all tasks
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({ status: false, msg: "No tasks found." });
        }
        res.status(200).json({ tasks, status: true, msg: "Tasks retrieved successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

// exports.getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ user: req.user.id });
//         res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
//     }
//     catch (err) {
//         console.error(err);
//         return res.status(500).json({ status: false, msg: "Internal Server Error" });
//     }
// }

exports.getTask = async (req, res) => {
    try {
        if (!validateObjectId(req.params.taskId)) {
            return res.status(400).json({ status: false, msg: "Task id not valid" });
        }

        const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
        if (!task) {
            return res.status(400).json({ status: false, msg: "No task found.." });
        }
        res.status(200).json({ task, status: true, msg: "Task found successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

exports.postTask = async (req, res) => {
    try {
        const { taskName, taskDescription, taskDueDate, taskPriority } = req.body;

        if (!taskName) {
            return res.status(400).json({ status: false, msg: "Task name is required!" });
        }

        // Create the task with additional details
        const task = await Task.create({
            user: req.user.id,
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority,
        });

        res.status(200).json({ task, status: true, msg: "Task created successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

exports.putTask = async (req, res) => {
    const { taskId } = req.params;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ msg: 'Authorization token is required' });
    }

    // Validate token here (e.g., using JWT verification)

    try {
        if (!validateObjectId(req.params.taskId)) {
            return res.status(400).json({ status: false, msg: "Task id not valid" });
        }

        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(400).json({ status: false, msg: "Task with given id not found" });
        }

        // Toggle status between 'pending' and 'done'
        task.status = task.status === 'pending' ? 'done' : 'pending';
        await task.save();  // Save updated task

        res.status(200).json({ msg: 'Task status updated successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
}


exports.deleteTask = async (req, res) => {
    try {
        if (!validateObjectId(req.params.taskId)) {
            return res.status(400).json({ status: false, msg: "Task id not valid" });
        }

        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(400).json({ status: false, msg: "Task with given id not found" });
        }

        // if (task.user != req.user.id) {
        //     return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
        // }

        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}