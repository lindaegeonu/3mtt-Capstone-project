// const express = require('express');
// const router = express.Router();
// const User = require('../models/tasks');
// const { getAllUsers } = require('../controller/tasks');

// // Get all users
// router.get('/', getAllUsers );

// // Get a single user
// router.get('/:id', getUser, (req, res) => {
//   res.json(res.user);
// });

// // Create a new user
// router.post('/ok', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     description: req.body.description,
//     date: req.body.date,
//     priority: req.body.priority
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a user
// router.put('/:id', getUser, async (req, res) => {
//   if (req.body.name != null) {
//     res.user.name = req.body.name;
//   }

//   if (req.body.email != null) {
//     res.user.email = req.body.email;
//   }

//   if (req.body.age != null) {
//     res.user.age = req.body.age;
//   }

//   try {
//     const updatedUser = await res.user.save();
//     res.json(updatedUser);
//   }catch (err) {
//     res.status(400).json({ message: err.message });
//     }
//     });
    
//     // Delete a user
//     router.delete('/:id', getUser, async (req, res) => {
//     try {
//     await res.user.remove();
//     res.json({ message: 'User deleted' });
//     } catch (err) {
//     res.status(500).json({ message: err.message });
//     }
//     });

    
    
//     async function getUser(req, res, next) {
//     let user;
//     try {
//     user = await User.findById(req.params.id);
//     if (user == null) {
//     return res.status(404).json({ message: 'Cannot find user' });
//     }
//     } catch (err) {
//     return res.status(500).json({ message: err.message });
//     }
    
//     res.user = user;
//     next();
//     }
    
//     module.exports = router;

// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controller/tasks.js");
const { verifyAccessToken } = require("../middlewares/index.js");

// Routes beginning with /api/tasks
router.get("/", verifyAccessToken, getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;