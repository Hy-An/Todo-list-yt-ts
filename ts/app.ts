import { ElementInterface, ListInterface, TimeOptions } from "./interfaces.js";

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input") as HTMLInputElement;

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST: ListInterface[], id: number;

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(
  array: { name: string; id: number; done: boolean; trash: boolean }[]
) {
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
const options: TimeOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const today = new Date();

dateElement!.innerHTML = today.toLocaleDateString("es-AR", options);

function addToDo(toDo: string, id: number, done: boolean, trash: boolean) {
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

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

function completeToDo(element: ElementInterface) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element: ElementInterface) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

list!.addEventListener("click", function (event) {
  const element = event.target as any;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
