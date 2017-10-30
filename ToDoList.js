var myToDoList = new ToDoList();
var addTextButton = document.getElementById("AddText");
addTextButton.addEventListener("click", function() { myToDoList.AddToToDo() });


function ToDoList() 
{
    this.myToDo = new Array();
    this.myDoneToDo = new Array();

    this.myToDoList = document.getElementById("ListThingsToDo");
    this.myDoneList = document.getElementById("ListThingsDone");

    this.AddToToDo = function () 
    {
        var toDoText = document.getElementById("ToDoInput").value;

        if (toDoText.length > 0) 
        {

            var listElement = document.createElement("li");

            var textNode = document.createTextNode(toDoText);
            listElement.appendChild(textNode);

            var deleteButton = document.createElement("div");
            deleteButton.className = "ButtonDelete";
            deleteButton.addEventListener("click", function () { myToDoList.DeleteElementFromToDo(this.parentElement); }); 
            listElement.appendChild(deleteButton);

            var doneButton = document.createElement("div");
            doneButton.className = "ButtonDone";
            doneButton.addEventListener("click", function () { myToDoList.MoveToDoneList(this.parentElement); });
            listElement.appendChild(doneButton);



            this.myToDo.push(listElement);
            this.myToDoList.appendChild(listElement);
        }
        else 
        {
            alert("Can't add empty To Do's");
        }
    }

    this.DeleteElementFromToDo = function (item) 
    {
        this.myToDoList.removeChild(item);
    }

    this.MoveToDoneList = function (item) 
    {   
        //Remove all buttons
        var i = item.childNodes.length;

        while (i--) 
        {
            if (item.childNodes[i].nodeType == 1)
            {
                item.removeChild(item.childNodes[i]);
            }
        }
        this.myDoneList.appendChild(item);
        this.myDoneToDo.push(item);

    }
}


