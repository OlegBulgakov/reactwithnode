const mongoose = require('mongoose');

const Task = mongoose.model('todoitem');

function getAll(req, res) {
    Task.find({}).then((data) => {
        res.json({todoitems: data});
    }, (err) => {
        res.status(500).json('Error');
    })
}

function postTask(req, res) {
    Task.create({
      text: req.body.newItem.text,
      checked: req.body.newItem.checked
    }).then((task) => {
      res.status(200).json({
        item: task
      })
      res.send()
    })
};

function deleteTask(req, res) {
    Task.deleteOne({
      _id: req.params.id
    }, (err) => {
      if (err) {
        res.status(500)
      } else {
        res.status(200)
      }
      res.send()
    })
};

function deleteClearCompleted (req, res) {
    Task.deleteMany({
      checked: true
    }, (err) => {
      if (err) {
        res.status(500)
      } else {
        res.status(200)
      }
      res.send()
    })
};

function checkbox(req, res) {
    Task.updateOne({
      _id: req.body.itemToCheck.key
    }, {
      text: req.body.itemToCheck.text,
      checked: req.body.itemToCheck.checked
    }, (err) => {
      if (err) {
        res.status(500)
      } else {
        res.status(200)
      }
      res.send()
    })
};

function changeData(req, res) {
    Task.updateOne({
      _id: req.body.itemToCheck.key
    }, {
      text: req.body.itemToCheck.text,
      checked: req.body.itemToCheck.checked
    }, (err) => {
      if (err) {
        res.status(500)
      } else {
        res.status(200)
      }
      res.send()
    })
};

function checkAll(req, res) {
    if (req.body.checkAll === false) {
      Task.updateMany({}, {
        '$set': {
          'checked': true
        }
      }, (err) => {
        if (err) {
          res.status(500)
        } else {
          res.status(200)
        }
      })
    } else {
      Task.updateMany({}, {
        '$set': {
          'checked': false
        }
      }, (err) => {
        if (err) {
          res.status(500)
        } else {
          res.status(200)
        }
      })
    }
    res.send()
};

module.exports = {
    getAll,
    postTask,
    deleteTask,
    deleteClearCompleted,
    checkbox,
    changeData,
    checkAll,
}