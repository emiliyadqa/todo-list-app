const input_todo = document.querySelector("input");

document.querySelector("#btn-add").addEventListener("click", () => {
  const inputData = input_todo.value;
  addTask(inputData);
  input_todo.value = "";
});

const addTask = (task) => {
  if (task.length > 0) {
    const list = document.querySelector(".list");

    const listItem = document.createElement("li");
    listItem.className = "list__item";
    list.appendChild(listItem);

    const listContent = document.createTextNode(task);
    listItem.appendChild(listContent);

    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container";

    const btnDone = document.createElement("button");
    btnDone.className = "btn-icon";
    const doneIcon = document.createElement("span");
    doneIcon.className = "material-symbols-outlined icon icon--done";
    doneIcon.textContent = "check_circle";
    btnDone.appendChild(doneIcon);

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-icon";
    const editIcon = document.createElement("span");
    editIcon.className = "material-symbols-outlined icon icon--edit";
    editIcon.textContent = "edit";
    btnEdit.appendChild(editIcon);

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn-icon";
    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-symbols-outlined icon icon--delete";
    deleteIcon.textContent = "delete";
    btnDelete.appendChild(deleteIcon);

    iconContainer.appendChild(btnDone);
    iconContainer.appendChild(btnEdit);
    iconContainer.appendChild(btnDelete);

    listItem.appendChild(iconContainer);
  }
};
