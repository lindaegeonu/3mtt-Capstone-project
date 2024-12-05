// const mongoose = require('mongoose');

// const tasksSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   name: String,
//   description:String,
//   date: { type: Date, default: Date.now },
//   priority: String
// });

// module.exports = mongoose.model('Tasks', tasksSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: false },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }  // Default status is 'pending'
});

module.exports = mongoose.model("Task", taskSchema);
