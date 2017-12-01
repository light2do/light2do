"use strict";

var mainInput = document.getElementById("mainTextInput");
var submitInput = document.getElementById("submitInput");
var toDoListView = document.getElementById("toDoListView");
var alreadyDoneListView = document.getElementById("alreadyDoneListView");
var alreadyDoneHeading = document.getElementById("alreadyDoneHeading");
var mainContainer = document.getElementById("mainContainer");
var inputText = "";

var daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// main TO DO list
var toDoList = new Array();
var alreadyDoneList = new Array();

var isMyStorage = false;
if (window.localStorage) {
    console.log("local storage in use");
    isMyStorage = true;
    if (localStorage.getItem("toDoList")) {
        console.log("toDoList in local Storage");
        var toDoListFromLocal = JSON.parse(localStorage.getItem("toDoList"));
        if (toDoListFromLocal.length > 0) {
            for (var i = 0; i < toDoListFromLocal.length; i++) {
                var text = JSON.parse(localStorage.getItem("toDoList"))[i].text;
                var date = JSON.parse(localStorage.getItem("toDoList"))[i].date;
                var helpDate = new Date(date);
                toDoList.push(new ToDoItem(text, helpDate));
            }
        }
    }
    if (localStorage.getItem("alreadyDoneList")) {
        var _toDoListFromLocal = JSON.parse(localStorage.getItem("alreadyDoneList"));
        if (_toDoListFromLocal.length > 0) {
            for (var _i = 0; _i < _toDoListFromLocal.length; _i++) {
                var _text = JSON.parse(localStorage.getItem("alreadyDoneList"))[_i].text;
                var _date = JSON.parse(localStorage.getItem("alreadyDoneList"))[_i].date;
                var _helpDate = new Date(_date);
                alreadyDoneList.push(new ToDoItem(_text, _helpDate));
            }
        }
    }
}

function saveToDoLocal() {
    if (toDoList.length > 0) {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    } else {
        localStorage.removeItem("toDoList");
    }if (alreadyDoneList.length > 0) {
        localStorage.setItem("alreadyDoneList", JSON.stringify(alreadyDoneList));
    } else {
        localStorage.removeItem("alreadyDoneList");
    }
}

// Main OBJECT ITEM
function ToDoItem(text, date) {
    this.text = text;
    this.date = date;
}

// INPUT TEXT LISTENER
mainInput.addEventListener("input", function (e) {
    inputText = this.value;
    if (inputText.length > 0) {
        setInputWidth(this, 80);
        setInputWidth(submitInput, 18);
    } else {
        setInputWidth(this, 100);
        setInputWidth(submitInput, 5);
    }
});

// Add item to TO DO LIST ARRAY
function addItem() {
    var d = new Date();
    toDoList.unshift(new ToDoItem(inputText, d));
    mainInput.value = "";
    setInputWidth(mainInput, 100);
    mainInput.focus();
    inputText = "";
    saveToDoLocal();
    drawToDoList();
}

// Setting width of element
function setInputWidth(element, inputWidth) {
    element.style.width = inputWidth + "%";
}

// IF ENTER IS PRESSED
window.addEventListener("keypress", function (e) {
    if (e.keyCode == 13 && inputText.length > 0) {
        addItem();
    }
});

// ADD BUTTON IS CLICKED
submitInput.addEventListener("click", function () {
    addItem();
});

function createItemContent(array, elem, i) {
    var helpItemVar = "";
    if (elem === "toDo") {
        helpItemVar = "OK";
    } else {
        helpItemVar = "DO";
    }
    var itemContent = "\n        <div class=\"toDoList-Container\">\n            <div class=\"toDoList-content\">\n                <p class=\"toDoDate\">" + daysName[array[i].date.getDay()] + " - " + array[i].date.toLocaleDateString() + " - " + array[i].date.toLocaleTimeString() + "</p>\n                <p class=\"toDoText\">" + array[i].text + "</p>\n            </div>\n            <div class=\"toDoList-controlContainer\">\n                <div class=\"toDoList-controlItem danger\" id=\"" + elem + "_delete_" + i + "\">X</div>\n                <div class=\"toDoList-controlItem\" id=\"" + elem + "_done_" + i + "\">" + helpItemVar + "</div>\n            </div>\n        </div>\n    ";
    return itemContent;
}

// Draw TO DO list to VIEW
function drawToDoList() {
    clearListView(toDoListView);
    if (toDoList.length > 0) {
        var _loop = function _loop(_i2) {
            var listItem = document.createElement("li");

            listItem.innerHTML = createItemContent(toDoList, "toDo", _i2);
            toDoListView.appendChild(listItem);

            // delete item Event Listener
            var deleteID = "toDo_delete_" + _i2;
            document.getElementById(deleteID).addEventListener("click", function () {
                toDoList.splice(_i2, 1);
                drawToDoList();
                saveToDoLocal();
            });
            // done item Event Listener
            var doneId = "toDo_done_" + _i2;
            document.getElementById(doneId).addEventListener("click", function () {
                alreadyDoneList.unshift(toDoList[_i2]);
                toDoList.splice(_i2, 1);
                drawToDoList();
                drawAlreadyDoneList();
                saveToDoLocal();
            });
        };

        for (var _i2 = 0; _i2 < toDoList.length; _i2++) {
            _loop(_i2);
        }
    } else {
        if (isMyStorage) {
            toDoListView.innerHTML = "<h3>Great, everything is done :)</h3>";
        } else {
            toDoListView.innerHTML = "<h3>Sorry, your browser does not support local storage :(</h3>";
        }
    }
}
// Drawing Already Done List
function drawAlreadyDoneList() {
    clearListView(alreadyDoneListView);
    if (alreadyDoneList.length > 0) {
        alreadyDoneHeading.style.display = "block";

        var _loop2 = function _loop2(_i3) {
            var listItem = document.createElement("li");

            listItem.innerHTML = createItemContent(alreadyDoneList, "done", _i3);
            alreadyDoneListView.appendChild(listItem);

            // delete item Event Listener
            var deleteID = "done_delete_" + _i3;
            document.getElementById(deleteID).addEventListener("click", function () {
                alreadyDoneList.splice(_i3, 1);
                drawAlreadyDoneList();
                saveToDoLocal();
            });
            // do item Event Listener
            var doneId = "done_done_" + _i3;
            document.getElementById(doneId).addEventListener("click", function () {
                toDoList.unshift(alreadyDoneList[_i3]);
                alreadyDoneList.splice(_i3, 1);
                drawToDoList();
                drawAlreadyDoneList();
                saveToDoLocal();
            });
        };

        for (var _i3 = 0; _i3 < alreadyDoneList.length; _i3++) {
            _loop2(_i3);
        }
    } else {
        alreadyDoneHeading.style.display = "none";
    }
}

// Clear all TO DO in VIEW
function clearListView(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial draw of TO DO list to VIEW
drawToDoList();
drawAlreadyDoneList();