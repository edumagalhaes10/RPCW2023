var http = require('http')
var axios = require('axios')
var toDoListPage = require('./toDoListPage')
var static = require('./static.js')
const { parse } = require('querystring');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function resultToTask(result) {
    axios.get("http://localhost:3000/tasks?_sort=id&_order=desc&_limit=1")
        .then(function(response){
            var id = response.data[0].id
            console.log(id)
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
        })

}

var toDoServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": {
                if(req.url == "/"){
                    axios.get("http://localhost:3000/tasks")
                    .then(function(response){
                        var tasks = response.data
                        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                        res.end(toDoListPage.toDoListPage(tasks))
                    })
                    .catch(erro => {
                        console.log("Erro: "+ erro)
                        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                        res.end("ERRO: "+ erro)
                    })   
                }   
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            }
            case "POST":{
                 // POST /persons -------------------------------------------------------------------
                 collectRequestBodyData(req, result => {
                    if(result){
                        // console.log(result)
                        axios.post("http://localhost:3000/tasks",{
                            name: result.name,
                            deadline: result.deadline,
                            description: result.description,
                            done: "no" 
                        })
                        .catch(erro => {
                            console.log("Erro: "+ erro)
                            res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                            res.end("ERRO: "+ erro)
                        })   
                    }
                    else{
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                });
                break
            }
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

toDoServer.listen(8080, ()=>{
    console.log("Servidor à escuta na porta 8080...")
})



