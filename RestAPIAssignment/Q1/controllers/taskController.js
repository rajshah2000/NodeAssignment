const Task = require('../models/Task');

const getTasks = async (req, res) => {
  
    const tasks = await Task.find();
    res.render('index', { tasks });  
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  
    const newTask = new Task({ title, description });
    await newTask.save();
    res.redirect('/');  
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  
    await Task.findByIdAndUpdate(id, { title, description, status });
    res.redirect('/');  
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  
    await Task.findByIdAndDelete(id);
    res.redirect('/');  
};

const patchTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
    await Task.findByIdAndUpdate(id, { status });
    res.redirect('/');
};

module.exports = {getTasks , createTask , updateTask,deleteTask,patchTaskStatus}