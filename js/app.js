//TODO Selectors:
const todoInput = document.querySelector(".todo-input");
const todoButtton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const form = document.querySelector("form");

//todo CREATE LOCAL STORAGE:
let array = JSON.parse(localStorage.getItem("todos")) || [];
showOnScreen();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  let obj = {
    goal: todoInput.value,
    done: false,
  };

  if (!obj.goal.match(/^ *$/)) {
    array.push(obj);
  }


  sendToLocalStorage();
  showOnScreen(array);
  todoInput.value = "";
});

function showOnScreen() {
  let html = array.map((item, index) => {
    let isDone = item.done ? "completed" : "";
    return `
             <div class="todo ${isDone}" data-index = ${index}>
                <li class="todo-item">${item.goal}</li>
                <button class="complete-btn">
                    <i class="fas fa-check"></i>
                </button>
                <button class="trash-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
  });

  todoList.innerHTML = html.join("");
}

todoList.addEventListener("click", function (e) {
  let target = e.target;

  if (target.classList.contains("trash-btn")) {
    let index = target.parentElement.dataset.index;
    target.parentElement.classList.add("fall");
    setTimeout(() => {
      array.splice(index, 1);
      sendToLocalStorage();
      showOnScreen();
    }, 500);

  } else if (target.classList.contains("complete-btn")) {
    target.parentElement.classList.toggle("completed");
    setTimeout(() => {
      array[target.parentElement.dataset.index].done = !array[
        target.parentElement.dataset.index
      ].done;
      sendToLocalStorage();
      showOnScreen();
    }, 500);
  }

});

function sendToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(array));
}