// SPA To Do List

exports.toDoListPage = function(tasks){
    var toDo = []
    var done = []
    for (let i = 0; i<tasks.length; i++){
        if(tasks[i].done == "no") toDo.push(tasks[i])
        else done.push(tasks[i])
    }

    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="check.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>To Do List</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>To Do List</h1>
            </header>
            <br>
            <form class="w3-container" id="addTask" method="POST">
                <fieldset>
                    <legend>Add Task</legend>
                    <label>Name</label>
                    <input class="w3-input w3-round" type="text" name="name" required>
                    <br>
                    <label>Deadline Date</label>
                    <input class="w3-input w3-round" type="date" name="deadline" required>
                    <br>
                    <label>Task Description</label>
                    <input class="w3-input w3-round" type="text" name="description" required>
                </fieldset> 
                <br/>
                <button class="w3-btn w3-green w3-mb-2" type="submit">Register</button>
            </form> 
        </div>
`

pagHTML += `
        <div>
        <div class = "w3-half"> 
        <div class="w3-container w3-center">
            <h2 class="w3-grey w3-text-white">To Do Tasks</h2>
        </div>
`
for (let i = 0; i<toDo.length; i++){
    pagHTML += `
            <div class="w3-container">
                <div class="w3-panel w3-light-grey w3-bottombar w3-border-grey w3-border w3-display-container">
                    <p><b>Name:</b> ${toDo[i].name}</p>
                    <p><b>Deadline Date:</b> ${toDo[i].deadline}</p>
                    <p><b>Task Description:</b> ${toDo[i].description}</p>
                    <div class="w3-container w3-display-right">
                        <button class="w3-button w3-grey w3-card-4" onclick="toggleAccordion(${toDo[i].id})">Edit</button>
                        <button class="w3-button w3-grey w3-hover-red w3-card-4" type="submit" form="delete${toDo[i].id}">Delete</button>
                        <button class="w3-button w3-grey w3-hover-green w3-card-4" type="submit" form="complete${toDo[i].id}">Complete</button>
                        <form id="delete${toDo[i].id}" method="POST" action="delete">
                            <input type="hidden" name="id" value="${toDo[i].id}">
                        </form>
                        <form id="complete${toDo[i].id}" method="POST" action="complete">
                            <input type="hidden" name="id" value="${toDo[i].id}">
                            <input type="hidden" name="name" value="${toDo[i].name}">
                            <input type="hidden" name="deadline" value="${toDo[i].deadline}">
                            <input type="hidden" name="description" value="${toDo[i].description}">
                            <input type="hidden" name="done" value="yes">
                        </form>
                    </div>
                </div>

                <div class="w3-accordion w3-card-4">
                    <div id="accordion${toDo[i].id}" class="w3-accordion-content w3-hide">
                          <form class="w3-container" method="POST" action="edit">
                          <div class="w3-section">
                            <h3><b>Edit Task</b></h3>
                            <input type="hidden" value="${toDo[i].id}" name="id">
                            <label><b>Name</b></label>
                            <input class="w3-input w3-border" type="text" value="${toDo[i].name}" name="name">
                            <label><b>Deadline Date</b></label>
                            <input class="w3-input w3-border" type="date" value="${toDo[i].deadline}" name="deadline">
                            <label><b>Task Description</b></label>
                            <input class="w3-input w3-border" type="text" value="${toDo[i].description}" name="description">
                            <input type="hidden" name="done" value="no">
                            <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Confirm</button>
                          </div>
                          </form>
                    </div>
                </div>

            </div>
    `
}

pagHTML += `
        </div>`

 pagHTML += `
        <div>
        <div class = "w3-half"> 
        <div class="w3-container w3-center">
            <h2 class="w3-green">Done Tasks</h2>
        </div>
        `
for (let i = 0; i<done.length; i++){
    pagHTML += `
            <div class="w3-container">
                <div class="w3-panel w3-pale-green w3-bottombar w3-border-green w3-border w3-display-container">
                    <p><b>Name:</b> ${done[i].name}</p>
                    <p><b>Deadline Date:</b> ${done[i].deadline}</p>
                    <p><b>Task Description:</b> ${done[i].description}</p>
                    <div class="w3-container w3-display-right">
                        <button class="w3-button w3-grey w3-card-4" onclick="toggleAccordion(${done[i].id})">Edit</button>
                        <button class="w3-button w3-grey w3-hover-red w3-card-4" type="submit" form="delete${done[i].id}">Delete</button>
                        <form id="delete${done[i].id}" method="POST" action="delete">
                            <input type="hidden" name="id" value="${done[i].id}">
                        </form>
                    </div>
                </div>

                <div class="w3-accordion w3-card-4">
                    <div id="accordion${done[i].id}" class="w3-accordion-content w3-hide">
                          <form class="w3-container" method="POST" action="edit">
                          <div class="w3-section">
                            <h3><b>Edit Task</b></h3>
                            <input type="hidden" value="${done[i].id}" name="id">
                            <label><b>Name</b></label>
                            <input class="w3-input w3-border" type="text" value="${done[i].name}" name="name">
                            <label><b>Deadline Date</b></label>
                            <input class="w3-input w3-border" type="date" value="${done[i].deadline}" name="deadline">
                            <label><b>Task Description</b></label>
                            <input class="w3-input w3-border" type="text" value="${done[i].description}" name="description">
                            <input type="hidden" name="done" value="yes">
                            <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Confirm</button>
                          </div>
                          </form>
                    </div>
                </div>

            </div>
    `
}

pagHTML += `
        </div>`



pagHTML += `
        </div>

        <script>
        function toggleAccordion(id) {
            var x = document.getElementById('accordion' + id);
            if (x.classList.contains('w3-hide')) {
              x.classList.remove('w3-hide');
            } else {
              x.classList.add('w3-hide');
            }
          }
        </script>

    </body>
</html>
`
    return pagHTML
}