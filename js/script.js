const btnAddTask = document.querySelector("#btn-add");
const inputTodo = document.querySelector(".input--todo");
const listTask = document.querySelector(".list");

const handleAddTask = () => {
  const task = inputTodo.value.trim();
  if (task) {
    addTask(task);
    inputTodo.value = "";
  }
};
btnAddTask.addEventListener("click", handleAddTask);

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

  const iconContainer = createIconContainer();
  listItem.appendChild(iconContainer);

  return listItem;
};

//Create div class="icon-container"
const createIconContainer = () => {
  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  const btnDone = createBtnIcon("check_circle", "icon--done", handleDoneTask);
  const btnEdit = createBtnIcon("edit", "icon--edit");
  const btnDelete = createBtnIcon("delete", "icon--delete", handleDeleteTask);

  iconContainer.appendChild(btnDone);
  iconContainer.appendChild(btnEdit);
  iconContainer.appendChild(btnDelete);

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

const handleDoneTask = (event) => {
  const listItem = event.target.closest(".list__item");
  listTask.removeChild(listItem);
};

const handleDeleteTask = (event) => {
  const listItem = event.target.closest(".list__item");
  listTask.removeChild(listItem);
};

// console.log(addTask("to do"));
// console.log(createListItem("To do"));
// console.log(createIconContainer());
// console.log(createBtnIcon("edit", "icon--edit"));
