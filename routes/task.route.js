const TaskController = require('../controllers/task.controller');

module.exports = function (app) {
    app.get('/', TaskController.getAll)
    app.post('/', TaskController.postTask)
    app.delete('/:id', TaskController.deleteTask)
    app.delete('/', TaskController.deleteClearCompleted)
    app.put('/', TaskController.checkbox)
    app.put('/', TaskController.changeData)
    app.put('/setAll', TaskController.checkAll)
}