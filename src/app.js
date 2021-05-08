import { clear, dateElement, CHECK, UNCHECK, LINE_THROUGH, list, option, today, } from "./constants.js";
import { clickEvent, addItem, clearLocalStorage } from "./utils.js";
export let LIST = [], id = 0;
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else {
    LIST = [];
    id = 0;
}
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//date
dateElement.innerHTML = today.toLocaleDateString("es-AR", option);
export function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = ` <li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text${LINE}">${toDo}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
export function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
//Event Listener
list.addEventListener("click", (event) => clickEvent(event));
document.addEventListener("keyup", (event) => addItem(event, id));
clear.addEventListener("click", clearLocalStorage);
