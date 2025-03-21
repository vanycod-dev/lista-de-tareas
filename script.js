document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("tarea");
    const addTaskBtn = document.getElementById("addtarea");
    const taskList = document.getElementById("lista-de-tareas");

    // Cargar tareas almacenadas
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            addTaskToList(task);
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
        }
    });

    function addTaskToList(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete">X</button>
        `;

        // Marcar como completada
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            li.querySelector("span").classList.toggle("completed");
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // Eliminar tarea
        li.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            taskList.removeChild(li);
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        taskList.appendChild(li);
    }
});
