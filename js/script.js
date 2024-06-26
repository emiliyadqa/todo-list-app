const btnAddTask = document.querySelector("#btn-add");
const inputTodo = document.querySelector(".input--todo");
const listTask = document.querySelector(".list");

const handleAddTask = () => {
  const task = inputTodo.value.trim();
  if (task) {
    addTask(task);
    inputTodo.value = "";
  }

  setListToLocalStorage();
};
btnAddTask.addEventListener("click", handleAddTask);

inputTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

inputTodo.addEventListener("focus", (event) => {
  event.target.placeholder = "";
});

inputTodo.addEventListener("blur", (event) => {
  event.target.placeholder = "What would you like to add?";
});

const addTask = (task) => {
  const listItem = createListItem(task);
  listTask.appendChild(listItem);
};

//Create List_item element with class list_item and textContext
const createListItem = (content) => {
  const listItem = document.createElement("li");
  listItem.className = "list__item";
  if (content) {
    listItem.textContent = content;
  }

  const iconContainer = createIconContainerWithAll();
  listItem.appendChild(iconContainer);

  return listItem;
};

//Create div class="icon-container"
const createIconContainerWithAll = () => {
  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  const btnDone = createBtnIcon("check_circle", "icon--done", handleDoneTask);
  const btnEdit = createBtnIcon("edit", "icon--edit", handleEditTask);
  const btnDelete = createBtnIcon("delete", "icon--delete", handleDeleteTask);

  iconContainer.appendChild(btnDone);
  iconContainer.appendChild(btnEdit);
  iconContainer.appendChild(btnDelete);

  return iconContainer;
};

const createIconContainerWithDoneAll = () => {
  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  const btnAllDone = createBtnIcon("done_all", "icon--done", handleEditInput);

  iconContainer.appendChild(btnAllDone);

  return iconContainer;
};

//Create button class="btn-icon" with span class="material-symbols-outlined icon (icon--done/icon--edit/icon--delete) and textContext (check_circle/ edit/delete)

const createBtnIcon = (iconText, iconClass, eventHandler) => {
  const btnIcon = document.createElement("button");
  btnIcon.className = "btn-icon";

  const icon = document.createElement("span");
  icon.className = `material-symbols-outlined icon ${iconClass}`;
  icon.textContent = iconText;

  btnIcon.appendChild(icon);
  btnIcon.addEventListener("click", eventHandler);

  return btnIcon;
};

const handleEditTask = (event) => {
  const listItem = event.target.closest(".list__item");
  const listItemText = listItem.firstChild;

  const editListInput = document.createElement("li");
  editListInput.className = "list__item";
  editListInput.style = " background: #f6eaf8;;";

  const inputListItem = document.createElement("input");
  inputListItem.type = "text";
  inputListItem.value = listItemText.textContent;
  inputListItem.textContent = listItemText.textContent;
  inputListItem.className = "input--edit";

  editListInput.appendChild(inputListItem);

  const iconContainer = createIconContainerWithDoneAll();
  editListInput.appendChild(iconContainer);

  setTimeout(() => {
    inputListItem.focus();
  }, 0);

  listTask.replaceChild(editListInput, listItem);

  setListToLocalStorage();
};

const handleEditInput = (event) => {
  const listItem = event.target.closest(".list__item");
  const newValue = listItem.firstChild.value;
  if (!newValue) {
    listTask.removeChild(listItem);
  } else {
    const listItemNewValue = createListItem(newValue);
    listTask.replaceChild(listItemNewValue, listItem);
  }

  setListToLocalStorage();
};

const handleDoneTask = (event) => {
  const listItem = event.target.closest(".list__item");
  listTask.removeChild(listItem);
  setListToLocalStorage();
};

const handleDeleteTask = (event) => {
  const listItem = event.target.closest(".list__item");
  listTask.removeChild(listItem);
  setListToLocalStorage();
};

// console.log(addTask("to do"));
// console.log(createListItem("To do"));
// console.log(createIconContainer());
// console.log(createBtnIcon("edit", "icon--edit"));

const setListToLocalStorage = () => {
  const tasks = [];

  listTask.querySelectorAll(".list__item").forEach((task) => {
    tasks.push(task.firstChild.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadListFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task);
  });
};

loadListFromLocalStorage();
