"use strict";
exports.__esModule = true;
var clear = document.querySelector(".clear");
var dateElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input");
//Classes names
var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
var LINE_THROUGH = "lineThrough";
//variables
var LIST, id;
var data = localStorage.getItem("TODO");
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
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//date
var options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
var today = new Date();
dateElement.innerHTML = today.toLocaleDateString("es-AR", options);
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    var DONE = done ? CHECK : UNCHECK;
    var LINE = done ? LINE_THROUGH : "";
    var item = " <li class=\"item\">\n  <i class=\"fa " + DONE + " co\" job=\"complete\" id=\"" + id + "\"></i>\n  <p class=\"text" + LINE + "\">" + toDo + "</p>\n  <i class=\"fa fa-trash-o de\" job=\"delete\" id=\"" + id + "\"></i>\n  </li>";
    var position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        var toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
            console.log("anda");
        }
        input.value = "";
    }
});
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click", function (event) {
    var element = event.target;
    var elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
