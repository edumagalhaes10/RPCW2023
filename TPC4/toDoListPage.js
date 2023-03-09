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
                <h2>To Do List</h2>
            </header>
            <br>
            <form class="w3-container" id="addTask" method="POST">
                <fieldset>
                    <legend>Add Task</legend>
                    <label>Name</label>
                    <input class="w3-input w3-round" type="text" name="name">
                    <br>
                    <label>Deadline Date</label>
                    <input class="w3-input w3-round" type="date" name="deadline">
                    <br>
                    <label>Task Description</label>
                    <input class="w3-input w3-round" type="text" name="description">
                </fieldset> 
                <br/>
                <button class="w3-btn w3-green w3-mb-2" type="submit" onclick="return validateForm()">Register</button>
            </form>

            <footer class="w3-container w3-green"></footer>
        
        </div>
`

pagHTML += `
        <div>
        <div class = "w3-half"> 
        <div class="w3-container w3-center">
            <h1 class="w3-grey w3-text-white">To Do Tasks</h1>
        </div>
`
for (let i = 0; i<toDo.length; i++){
    pagHTML += `
            <div class="w3-container">
                <div class="w3-panel w3-light-grey w3-bottombar w3-border-grey w3-border w3-display-container">
                    <p><b>Name:</b> ${toDo[i].name}</p>
                    <p><b>Deadline Date:</b> ${toDo[i].deadline}</p>
                    <p><b>Task Description:</b> ${toDo[i].description}</p>
                    <div class="w3-display-right">
                        <button class="w3-button w3-grey w3-card-4">Edit</button>
                        <button class="w3-button w3-grey w3-card-4">Delete</button>
                        <button class="w3-button w3-grey w3-hover-green w3-card-4">Complete</button>
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
            <h1 class="w3-green">Done Tasks</h1>
        </div>
        `
for (let i = 0; i<done.length; i++){
    pagHTML += `
            <div class="w3-container">
                <div class="w3-panel w3-pale-green w3-bottombar w3-border-green w3-border w3-display-container">
                    <p><b>Name:</b> ${done[i].name}</p>
                    <p><b>Deadline Date:</b> ${done[i].deadline}</p>
                    <p><b>Task Description:</b> ${done[i].description}</p>
                    <div class="w3-display-right">
                        <button class="w3-button w3-grey w3-card-4">Edit</button>
                        <button class="w3-button w3-grey w3-card-4">Delete</button>
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
        function validateForm() {
            const form = document.getElementById('addTask');
            const inputs = form.querySelectorAll('input');

            for (let i = 0; i < inputs.length; i++) {
              if (inputs[i].value === '') {
                alert('Please fill in all fields');
                return false;
              }
            }
            return true;
        }
        </script>
    </body>
</html>
`
    return pagHTML
}