var toDoList = new ToDoList();
var addTextButton = document.getElementById("AddText");
addTextButton.addEventListener("click", function() { toDoList.AddToToDo() });

function ToDoList()
{
    this.toDo = new Array();
    this.doneToDo = new Array();


    this.AddToToDo = function()
    {
        var toDoText = document.getElementById("ToDoInput").value;
    
        this.toDo.push(toDoText);
        console.log("Added: " + toDoText);

        this.ReloadToDoList();
    }

    this.ReloadToDoList = function()
    {
        //Skriv ut ToDo-listan    
        for (item in this.ToDo)
        {
            //Print Item
        }
    }

    this.ReloadDoneList = function()
    {
        //Skriv ut Done-listan
        for (item in this.DoneToDo)
        {
            //Print Item
        }
    }

    this.DeleteItemAtIndex = function(index)
    {
        this.ToDo.splice(index, 1);
    }

    this.MoveToDoneListAtIndex = function(index)
    {
        this.DoneToDo.push(this.ToDo[index]);        
        this.ToDo.splice(index, 1);
    }
}


//Debug funktioner
function DebugMakeList() 
{
    toDoList.toDo.push("Detta är något som ska göras #1");
    toDoList.toDo.push("Detta är något som ska göras #2");
    toDoList.toDo.push("Detta är något som ska göras #3");
    toDoList.toDo.push("Detta är något som ska göras #4");

    toDoList.doneToDo.push("Detta är något som har gjorts #1");
    toDoList.doneToDo.push("Detta är något som har gjorts #1");

    console.log(toDoList);
}

