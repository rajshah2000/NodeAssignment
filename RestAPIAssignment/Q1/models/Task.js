const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskDB')
    .then(() => console.log('Connected to Db!'));

const schema = mongoose.Schema;

const TaskSchema = new schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: [
            'pending',
            'in progress',
            'completed'
        ],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel