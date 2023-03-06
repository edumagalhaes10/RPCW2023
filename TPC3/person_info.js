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
            <div class="w3-card-4" style="width:100%;">
                <header class="w3-container w3-blue-grey">
                    <h1>${person.nome}</h1>
                </header>

                <div class="w3-container">
    `

    for (let item in person){
        new_item = item.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
       
        if (typeof person[item] == 'object'){
            htmlpage +=`
                            <p><b>${new_item}: </b></p>
                            <ul>
            `
            for(let item2 in person[item]){
                new_item2 = item2.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
                aux = person[item]
                htmlpage += `
                                    <p><b>${new_item2}: </b>${aux[item2]}</p>

                `            
            }
            htmlpage += `               </ul>`
        }
        else{
            htmlpage += `
                            <p><b>${new_item}: </b>${person[item]}</p>
            
            `
        }
    } 
    `
                </div>               
            </div>
        </body>
    </html>
    `
    return htmlpage
}