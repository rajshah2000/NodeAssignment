const express = require('express');
const router = express.Router();
const {getTasks,createTask,updateTask,deleteTask,patchTaskStatus} = require('../controllers/taskController');

router.get('/',getTasks);
router.post('/tasks',createTask);
router.put('/tasks/:id',updateTask);
router.delete('/tasks/:id',deleteTask);
router.patch('/tasks/:id',patchTaskStatus);

module.exports = router;