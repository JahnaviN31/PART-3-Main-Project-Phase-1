document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const completedCount = document.getElementById("completed-count");
  const totalCount = document.getElementById("total-count");

  let completed = 0;
  let total = 0;

  function updateCounts() {
    completedCount.textContent = completed;
    totalCount.textContent = total;
  }

  function addTodo() {
    console.log("Add todo clicked"); 
    const todoText = input.value.trim();
    if (!todoText) return;

    total++;
    updateCounts();

    //create a todo
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    const textSpan = document.createElement("span");
    textSpan.textContent = todoText;
    textSpan.classList.add("todo-text");
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    // completed
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "&#10003;";
    completeButton.classList.add("check-btn");
    completeButton.addEventListener("click", () => {
      todoItem.classList.toggle("completed");
      if (todoItem.classList.contains("completed")) {
        completed++;
        celebrate();
      } else {
        completed--;
      }
      updateCounts();
    });
    // delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#128465;";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      if (todoItem.classList.contains("completed")) {
        completed--;
      }
      total--;
      todoItem.remove();
      updateCounts();
    });

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);
    todoItem.appendChild(textSpan);
    todoItem.appendChild(actionsDiv);

    todoList.appendChild(todoItem);
    input.value = "";
  }

  //confetti
  function celebrate() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  addButton.addEventListener("click", addTodo);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });
});
