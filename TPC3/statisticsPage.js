exports.statisticsPage = function(path,title,genderDist, css_arg){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <link rel="stylesheet" href="/style.css"/>
            <title>${title}</title>
        </head>
        <body>
            <div class="${css_arg}">
                <h1><b>${title}</b></h1>
                <ol>

            
    `

    for(var [key,value] of Object.entries(genderDist)){
        htmlpage += `                    <li><h4><a href="${path}/${key}"><b>${key} </b></a>: ${value}</h4></li>
        `
    }

    

    htmlpage+=`
                </ol>
            </div>
        </body>
    </html>
    `
    return htmlpage
}