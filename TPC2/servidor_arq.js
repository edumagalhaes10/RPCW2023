var http = require('http')
var fs = require('fs')
var url = require('url')


var myserver = http.createServer(function (req, res){
    var q = url.parse(req.url, true)
    if(q.pathname == "/"){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html;'})
            if(err) res.write("Erro: " + err)
            else res.write(data)
            res.end()
        })
    }
    else{
        var numPag = req.url.substring(1,)
        // fs.readFile('arqs_xml/arq'+numPag+'.xml', function(err, data){
        fs.readFile('arqs_html/arq'+numPag+'.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html;'})
            if(err) res.write("Erro: " + err)
            else res.write(data)
            res.end()
        })
    }
})

myserver.listen(8080)

console.log("Servidor à escuta na porta 8080...")
