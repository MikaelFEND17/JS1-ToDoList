function ToDoList()
{
    this.ToDo = new Array();
    this.DoneToDo = new Array();

    this.AddItem = function(Item)
    {
        this.ToDo.push(item);
        this.ReloadList();
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

    this.DeleteItemAtIndex(index)
    {
        this.ToDo.splice(index, 1);
    }

    this.MoveToDoneListAtIndex(index)
    {
        this.DoneToDo.push(this.ToDo[index]);        
        this.ToDo.splice(index, 1);
    }

    //Debug funktioner
    this.DebugMakeList()
    {
        this.ToDo.push("Detta är något som ska göras #1");
        this.ToDo.push("Detta är något som ska göras #2");
        this.ToDo.push("Detta är något som ska göras #3");
        this.ToDo.push("Detta är något som ska göras #4");

        this.DoneToDo.push("Detta är något som har gjorts #1");
        this.DoneToDo.push("Detta är något som har gjorts #1");
    }
}