exports.peoplePage = function(list){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>About People</title>
        </head>
        <body>
            <div class="w3-card-4">

            <header class="w3-container w3-blue-grey">
              <h1>Pessoas</h1>
            </header>

            <div class="w3-container"> 
            <table class="w3-table-all">
                <tr>
                    <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                </tr>
    `

    for (let i=0; i<list.length; i++){
        htmlpage+=`
                    <tr>
                        <td>${list[i].id}</td><td><a href="/people/${list[i].id}">${list[i].nome}</a></td><td>${list[i].idade}</td><td>${list[i].sexo}</td><td>${list[i].morada.cidade}</td>
                    </tr>
        `
    }

    htmlpage+=`
            </table>
            </div>
            </fiv>
        </body>
    </html>
    `
    return htmlpage
}