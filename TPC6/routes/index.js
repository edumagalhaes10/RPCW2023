var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.list()
    .then(pessoas => {
      res.render('index', { slist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

/* GET Student page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('pessoa', { p: pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da pessoa"})
    })
});

/* GET Student Delete Form. */
router.get('/pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('deletePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/pessoas/delete/:idAluno/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idAluno)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da pessoa"})
    })
})


/* GET Student Update Form. */
router.get('/pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('updatePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da pessoa"})
    })
})

// POST Student Update Form
router.post('/pessoas/edit', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  // Aluno.updateAluno(req.body)
  //   .then(aluno => {
  //     res.render('updateAlunoConfirm', {a: aluno})
  //   })
  //   .catch(erro => {
  //     res.render('error', {error: erro, message: "Erro na alteração do registo de aluno"})
  //   })
  console.log(req.body)
})

module.exports = router;
