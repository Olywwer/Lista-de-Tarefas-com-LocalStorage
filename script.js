let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {
  const filter = document.getElementById("filterInput").value.toLowerCase()
  const columns = {
    fazer: document.getElementById("fazerList"),
    fazendo: document.getElementById("fazendoList"),
    feito: document.getElementById("feitoList")
  }
  for (let key in columns) columns[key].innerHTML = ""
  tasks.forEach((task, index) => {
    if (!task.name.toLowerCase().includes(filter)) return
    const li = document.createElement("li")
    li.classList.add(task.status)
    li.innerHTML = `
      ${task.name} 
      <div>
        ${task.status !== 'feito' ? `<button class="btn btn-sm btn-success me-1" onclick="updateStatus(${index}, 'feito')">✔</button>` : ''}
        <button class="btn btn-sm btn-danger delete-btn" onclick="deleteTask(${index})">X</button>
      </div>
    `
    columns[task.status].appendChild(li)
  })
  document.getElementById("fazerCount").textContent = tasks.filter(t => t.status === "fazer").length
  document.getElementById("fazendoCount").textContent = tasks.filter(t => t.status === "fazendo").length
  document.getElementById("feitoCount").textContent = tasks.filter(t => t.status === "feito").length
}

function addTask() {
  const input = document.getElementById("taskInput")
  const status = document.getElementById("taskStatus").value
  const name = input.value.trim()
  if (!name) return
  tasks.push({ name, status })
  input.value = ""
  saveTasks()
  renderTasks()
}

function deleteTask(index) {
  const li = document.querySelectorAll("li")[index]
  li.classList.add("removing")
  setTimeout(() => {
    tasks.splice(index, 1)
    saveTasks()
    renderTasks()
  }, 200)
}

function clearAll() {
  if (!confirm("Tem certeza que deseja apagar todas as tarefas?")) return
  tasks = []
  saveTasks()
  renderTasks()
}

function updateStatus(index, newStatus) {
  tasks[index].status = newStatus
  saveTasks()
  renderTasks()
}

function toggleTheme() {
  document.body.classList.toggle("dark")
  document.querySelector(".kanban-container").classList.toggle("dark")
}

renderTasks()