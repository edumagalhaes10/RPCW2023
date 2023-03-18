var axios = require('axios')

module.exports.list = () =>{
    return axios.get("http://localhost:3000/tasks?_sort=id")
        .then(resposta =>{
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addTask = task =>{
    t["done"] = "no"
    return axios.post("http://localhost:3000/tasks",task)
    .then(resposta =>{
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.deleteTask = task =>{
    return axios.delete("http://localhost:3000/tasks/"+task.id)
    .then(resposta =>{
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.completeTask = task =>{
    return axios.put(`http://localhost:3000/tasks/${task.id}`,task)
    .then(resposta =>{
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.editTask = task =>{
    return axios.put(`http://localhost:3000/tasks/${task.id}`,task)
    .then(resposta =>{
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}