var http = require('http')
var url = require('url')
var fs = require('fs')
const axios = require('axios')
var peoplePage = require('./peoplePage')
var personInfo = require('./person_info')
var statisticsPage = require('./statisticsPage')

function sortDictionary(dict) {
    var aux = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    })
    
    aux.sort(function(value1, value2) {
      return value2[1] - value1[1];
    })

    var newDict = aux.reduce((obj, entry) => {
      obj[entry[0]] = entry[1];
      return obj;
    }, {});
    return newDict
}

http.createServer(function(req,res){
    // var d = new Date().toISOString.substring(0,16)
    console.log(req.method + " " + req.url) //+ " " + d)

    var q = url.parse(req.url, true)

    var q = url.parse(req.url, true)
    if(q.pathname == "/"){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html;'})
            if(err) res.write("Erro: " + err)
            else res.write(data)
            res.end()
        })
    }
    else if (q.pathname == "/people"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(peoplePage.peoplePage(pessoas))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (q.pathname.startsWith("/people/p")){
        var pId = req.url.substring(9,)
        axios.get("http://localhost:3000/pessoas/p"+pId)
            .then(function(response){
                var pessoa = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(personInfo.person_info(pessoa))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (q.pathname == "/gender"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data
                var genderDist = {}
                for(var p in pessoas){
                    if(genderDist[pessoas[p].sexo]) genderDist[pessoas[p].sexo]++
                    else genderDist[pessoas[p].sexo]=1
                }
                // console.log(genderDist)
                var orderedGenders = sortDictionary(genderDist)

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(statisticsPage.statisticsPage("/gender","Distribuição por sexo",orderedGenders, "center-screen"))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname.startsWith("/gender/")){
        var gender = req.url.substring(8,)
        axios.get("http://localhost:3000/pessoas/?sexo="+gender)
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(peoplePage.peoplePage(pessoas))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname == "/sport"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data
                var sportDist = {}
                for(var p in pessoas){
                    var p_sports = pessoas[p].desportos
                    var removeDuplicates = []
                    for(let i = 0; i<p_sports.length; i++){
                        if (!removeDuplicates.includes(p_sports[i])) removeDuplicates.push(p_sports[i])
                    }
                    for(let i = 0; i < removeDuplicates.length; i++){
                        sport = removeDuplicates[i]
                        if(sportDist[sport]) sportDist[sport]++
                        else sportDist[sport]=1
                    }  
                    var orderedSports = sortDictionary(sportDist)
                }
                // console.log(sportDist)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(statisticsPage.statisticsPage("/sport","Distribuição por desporto",orderedSports,"center"))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname.startsWith("/sport/")){
        var sport = req.url.substring(7,)
        axios.get("http://localhost:3000/pessoas/?desportos_like=\\b"+sport+"\\b")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(peoplePage.peoplePage(pessoas))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname == "/jobs"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data
                var jobDist = {}
                var top10 = {}
                for(var p in pessoas){
                    var p_job = pessoas[p].profissao
                    if(jobDist[p_job]) jobDist[p_job]++
                    else jobDist[p_job]=1
                }
                var orderedJobs = sortDictionary(jobDist)
                var first_N_keys = Object.keys(orderedJobs).slice(0,10)
                for(var k in first_N_keys){
                    var key = first_N_keys[k]
                    top10[key] = orderedJobs[key]
                }
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(statisticsPage.statisticsPage("/jobs","Top 10 Profissões",top10,"center-screen"))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname.startsWith("/jobs/")){
        var job = req.url.substring(6,)
        axios.get("http://localhost:3000/pessoas/?profissao="+job)
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(peoplePage.peoplePage(pessoas))})
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            }) 
    }
    else if (q.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css;'})
            if(err){
                console.log("Erro na leitura da stylesheet")
                res.write("Erro: " + err)
            }
            else res.write(data)
            res.end()
        })
    }
    else if (q.pathname == "/style.css"){
        fs.readFile('style.css', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css;'})
            if(err){
                console.log("Erro na leitura da stylesheet")
                res.write("Erro: " + err)
            }
            else res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
        res.end("ERRO: Operação não suportada")
    }
}).listen(8080)

console.log("Servidor à escuta na porta 8080...")
