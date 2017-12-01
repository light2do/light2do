"use strict";function saveToDoLocal(){toDoList.length>0?localStorage.setItem("toDoList",JSON.stringify(toDoList)):localStorage.removeItem("toDoList"),alreadyDoneList.length>0?localStorage.setItem("alreadyDoneList",JSON.stringify(alreadyDoneList)):localStorage.removeItem("alreadyDoneList")}function ToDoItem(t,e){this.text=t,this.date=e}function addItem(){var t=new Date;toDoList.unshift(new ToDoItem(inputText,t)),mainInput.value="",setInputWidth(mainInput,100),mainInput.focus(),inputText="",saveToDoLocal(),drawToDoList()}function setInputWidth(t,e){t.style.width=e+"%"}function createItemContent(t,e,o){var a="";a="toDo"===e?"OK":"DO";return'\n        <div class="toDoList-Container">\n            <div class="toDoList-content">\n                <p class="toDoDate">'+daysName[t[o].date.getDay()]+" - "+t[o].date.toLocaleDateString()+" - "+t[o].date.toLocaleTimeString()+'</p>\n                <p class="toDoText">'+t[o].text+'</p>\n            </div>\n            <div class="toDoList-controlContainer">\n                <div class="toDoList-controlItem danger" id="'+e+"_delete_"+o+'">X</div>\n                <div class="toDoList-controlItem" id="'+e+"_done_"+o+'">'+a+"</div>\n            </div>\n        </div>\n    "}function drawToDoList(){if(clearListView(toDoListView),toDoList.length>0)for(var t=0;t<toDoList.length;t++)!function(t){var e=document.createElement("li");e.innerHTML=createItemContent(toDoList,"toDo",t),toDoListView.appendChild(e);var o="toDo_delete_"+t;document.getElementById(o).addEventListener("click",function(){toDoList.splice(t,1),drawToDoList(),saveToDoLocal()});var a="toDo_done_"+t;document.getElementById(a).addEventListener("click",function(){alreadyDoneList.unshift(toDoList[t]),toDoList.splice(t,1),drawToDoList(),drawAlreadyDoneList(),saveToDoLocal()})}(t);else toDoListView.innerHTML=isMyStorage?"<h3>Great, everything is done :)</h3>":"<h3>Sorry, your browser does not support local storage :(</h3>"}function drawAlreadyDoneList(){if(clearListView(alreadyDoneListView),alreadyDoneList.length>0){alreadyDoneHeading.style.display="block";for(var t=0;t<alreadyDoneList.length;t++)!function(t){var e=document.createElement("li");e.innerHTML=createItemContent(alreadyDoneList,"done",t),alreadyDoneListView.appendChild(e);var o="done_delete_"+t;document.getElementById(o).addEventListener("click",function(){alreadyDoneList.splice(t,1),drawAlreadyDoneList(),saveToDoLocal()});var a="done_done_"+t;document.getElementById(a).addEventListener("click",function(){toDoList.unshift(alreadyDoneList[t]),alreadyDoneList.splice(t,1),drawToDoList(),drawAlreadyDoneList(),saveToDoLocal()})}(t)}else alreadyDoneHeading.style.display="none"}function clearListView(t){for(;t.firstChild;)t.removeChild(t.firstChild)}var mainInput=document.getElementById("mainTextInput"),submitInput=document.getElementById("submitInput"),toDoListView=document.getElementById("toDoListView"),alreadyDoneListView=document.getElementById("alreadyDoneListView"),alreadyDoneHeading=document.getElementById("alreadyDoneHeading"),mainContainer=document.getElementById("mainContainer"),inputText="",daysName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],toDoList=new Array,alreadyDoneList=new Array,isMyStorage=!1;if(window.localStorage){if(console.log("local storage in use"),isMyStorage=!0,localStorage.getItem("toDoList")){console.log("toDoList in local Storage");var toDoListFromLocal=JSON.parse(localStorage.getItem("toDoList"));if(toDoListFromLocal.length>0)for(var i=0;i<toDoListFromLocal.length;i++){var text=JSON.parse(localStorage.getItem("toDoList"))[i].text,date=JSON.parse(localStorage.getItem("toDoList"))[i].date,helpDate=new Date(date);toDoList.push(new ToDoItem(text,helpDate))}}if(localStorage.getItem("alreadyDoneList")){var _toDoListFromLocal=JSON.parse(localStorage.getItem("alreadyDoneList"));if(_toDoListFromLocal.length>0)for(var _i=0;_i<_toDoListFromLocal.length;_i++){var _text=JSON.parse(localStorage.getItem("alreadyDoneList"))[_i].text,_date=JSON.parse(localStorage.getItem("alreadyDoneList"))[_i].date,_helpDate=new Date(_date);alreadyDoneList.push(new ToDoItem(_text,_helpDate))}}}mainInput.addEventListener("input",function(t){(inputText=this.value).length>0?(setInputWidth(this,80),setInputWidth(submitInput,18)):(setInputWidth(this,100),setInputWidth(submitInput,5))}),window.addEventListener("keypress",function(t){13==t.keyCode&&inputText.length>0&&addItem()}),submitInput.addEventListener("click",function(){addItem()}),drawToDoList(),drawAlreadyDoneList();