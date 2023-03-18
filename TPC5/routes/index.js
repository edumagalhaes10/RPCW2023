var express = require('express');
var router = express.Router();
var Tasks = require("../controllers/tasks")

/* GET home page. */
router.get('/', function(req, res, next) {

  Tasks.list() 
    .then(tasks => {
      var toDo = []
      var done = []
      for (let i = 0; i<tasks.length; i++){
        if(tasks[i].done == "no") toDo.push(tasks[i])
        else done.push(tasks[i])
      }
      res.render('index', { todolist: toDo, donelist: done})
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
  
});

/* POST Add Task */
router.post('/', function(req, res, next) {
  Tasks.addTask(req.body) 
    .then(
      res.redirect('/')
    )
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/delete', function(req, res, next) {
  Tasks.deleteTask(req.body) 
    .then(
      res.redirect('/')
    )
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/complete', function(req, res, next) {
  Tasks.deleteTask(req.body) 
    .then(
      res.redirect('/')
    )
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/edit', function(req, res, next) {
  Tasks.editTask(req.body) 
    .then(
      res.redirect('/')
    )
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

module.exports = router;
