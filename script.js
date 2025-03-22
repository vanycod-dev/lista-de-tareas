document.addEventListener("DOMContentLoaded", () => {
    const tareaInput = document.getElementById("tarea");
    const addTareaBtn = document.getElementById("addtarea");
    const listaDeTareas = document.getElementById("lista-de-tareas");

    // Cargar tareas almacenadas
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));

    addTareaBtn.addEventListener("click", () => {
        const tareaText = tareaInput.value.trim();
        if (tareaText) {
            const tarea = { text: tareaText, completed: false };
            validador(tarea);
            tareaInput.value = "";
        }
    });
    function validador(dato) {
        const existe = tasks.some(index => index.text === dato.text);
        
        if (existe) {
            alert("La tarea ya existe ⚠️");
            return false;
        }
    
        alert("Tarea agregada ✅");
        addTaskToList(dato);
        tasks.push(dato);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    
    function addTaskToList(task) {
        const li = document.createElement("li");
    
        if (task.completed) {
            li.classList.add("shadownone");
        }
    
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete">X</button>
        `;
    
        // Marcar como completada
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            li.querySelector("span").classList.toggle("completed");
            li.classList.toggle("shadownone"); // Agregar o quitar la sombra
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    
        // Eliminar tarea
        li.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            listaDeTareas.removeChild(li);
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    
        listaDeTareas.appendChild(li);
    }
    
});

//Agregar categorias
