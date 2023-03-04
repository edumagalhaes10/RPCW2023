exports.person_info = function(person){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>${person.nome}</title>
        </head>
        <body>
            <div class="w3-card-4" style="width:50%;">
                <header class="w3-container w3-blue-grey">
                    <h1>${person.nome}</h1>
                </header>

                <div class="w3-container">
                    <p><b>Id: </b>${person.id}</p>
                    <p><b>Idade: </b>${person.idade}</p>
                    <p><b>Sexo: </b>${person.sexo}</p>
                    <p><b>Cidade: </b>${person.morada.cidade}</p>
                </div                
            </div>
        </body>
    </html>
    `
    return htmlpage
}