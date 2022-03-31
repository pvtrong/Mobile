const classNames = {
	TODO_ITEM: "todo-container",
	TODO_CHECKBOX: "todo-checkbox",
	TODO_TEXT: "todo-text",
	TODO_DELETE: "todo-delete",
  BTN_PRIMARY: "btn-primary",
  BTN_DANGER: "btn-danger"
};
let itemCount = 0;
let uncheckedCount = 0;

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

/**
 * Xử lý sự kiện nút thêm TODO
 */
function newTodo() {
	const task = prompt("What is your new TODO?", "New TODO");

	// Validate
	if (task.length > 0) {
		// Tăng item count lên 1 và unchecked lên 1
    itemCount++;
    uncheckedCount++;
    updateCounter();

    // Tạo thêm 1 TODO
    const newTODO = document.createElement("li");
    newTODO.className = classNames.TODO_ITEM;
    newTODO.id = itemCount;
    list.appendChild(newTODO);

    const newCheckTODO = document.createElement("input");
    newCheckTODO.className = classNames.TODO_CHECKBOX;
    newCheckTODO.type = "checkbox";
    newCheckTODO.id = "checkbox_" + itemCount;
    newCheckTODO.setAttribute("onClick", "checkTODO(this.id)");
    newTODO.appendChild(newCheckTODO);

    const newTextTODO = document.createTextNode(task);
    newTODO.appendChild(newTextTODO);
    
    const newDeleteTODO = document.createElement("button");
    newDeleteTODO.className = classNames.TODO_DELETE + " btn " + classNames.BTN_DANGER;
    newDeleteTODO.innerText = "DELETE";
    newDeleteTODO.id = "delete_" + itemCount;
    newDeleteTODO.value = itemCount;
    newDeleteTODO.setAttribute("onClick", "deleteTODO(this.value)");
    newTODO.appendChild(newDeleteTODO);
    
    
	}
}

/**
 * update lại các biến counter
 */
function updateCounter(){
  itemCountSpan.innerText = itemCount;
  uncheckedCountSpan.innerText = uncheckedCount;
}

/**
 * check TODO
 * @param {*} id: id của TODO 
 */
function checkTODO(id){
  const checkBox = document.getElementById(id);
  if(checkBox.checked){
    uncheckedCount--;
    updateCounter();
  } else {
    uncheckedCount++;
    updateCounter();
  }
}

function deleteTODO(value){
  const check = document.getElementById(`checkbox_${value}`)
  const deleteButton = document.getElementById(value);
  deleteButton.parentNode.removeChild(deleteButton);
  if(!check.checked){
    uncheckedCount--;
  }
  itemCount--;
  updateCounter();
}