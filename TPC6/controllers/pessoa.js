var Pessoa = require("../models/pessoa")

// Student list
module.exports.list = () => {
    return Pessoa.find().sort({nome:1})
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({id:id})
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({id:id})
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}