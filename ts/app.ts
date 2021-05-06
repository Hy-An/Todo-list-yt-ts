import {
  clear,
  dateElement,
  CHECK,
  UNCHECK,
  LINE_THROUGH,
  list,
  input,
  option,
  today,
} from "./constants.js";
import { ElementInterface, ListInterface, TimeOptions } from "./interfaces.js";
import { clickEvent, addItem } from "./utils.js";

//variables
export let LIST: ListInterface[] = [], id: number= 0;

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array: ListInterface[]) {
  array.forEach(function (item: {
    name: string;
    id: number;
    done: boolean;
    trash: boolean;
  }) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

clear!.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//date

dateElement!.innerHTML = today.toLocaleDateString("es-AR", option);

export function addToDo(toDo: string, id: number, done: boolean, trash: boolean) {
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

  list!.insertAdjacentHTML(position, item);
}

export function completeToDo(element: ElementInterface) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

export function removeToDo(element: ElementInterface) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//Event Listener
list!.addEventListener("click", (event) => clickEvent(event));
document.addEventListener("keyup", (event) => addItem(event,id));
