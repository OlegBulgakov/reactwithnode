const TaskController = require('../controllers/task.controller');

module.exports = function (app) {
    app.get('/api/todos/all', TaskController.getAll);
    app.post('/api/todos', TaskController.postTask);
    app.delete('/api/todos/:id', TaskController.deleteTask);
    app.delete('/api/todos', TaskController.deleteClearCompleted);
    app.put('/api/todos', TaskController.checkbox);
    app.put('/api/todos', TaskController.changeData);
    app.put('/api/todos/setAll', TaskController.checkAll)
};