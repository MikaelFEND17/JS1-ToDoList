var myToDoList = new ToDoList();
var addTextButton = document.getElementById("AddText");
addTextButton.addEventListener("click", function() { myToDoList.AddToToDo() });


var addTextPlusButton = document.getElementById("ButtonPlus");
addTextPlusButton.addEventListener("click", function() { myToDoList.AddTextVisibility() });


var addTextInput = document.getElementById("AddTextInput");
var addTextPlus = document.getElementById("AddTextPlus");


var elementListToDo = document.getElementById("ListThingsToDo");
var elementListDone = document.getElementById("ListThingsDone");

function ToDoList(elementListToDo, elementListDone) 
{
    this.myToDo = new Array();
    this.myDoneToDo = new Array();

    this.myToDoList = elementListToDo;
    this.myDoneList = elementListDone;

    this.myToDoCounter = 0;
    this.myDoneCounter = 0;

    this.AddToToDo = function () 
    {
        var toDoText = document.getElementById("ToDoInput").value;

        if (toDoText.length > 0) 
        {

            var listElement = document.createElement("li");

            var textNode = document.createTextNode(toDoText);
            listElement.className = 'fade';

            var indexDiv = document.createElement("div");
            indexDiv.className = "ArrayIndex";
            var indexNode = document.createTextNode(this.myToDoCounter);
            indexDiv.appendChild(indexNode);
            listElement.appendChild(indexDiv);

            this.myToDoCounter++;

            var deleteButton = document.createElement("div");
            deleteButton.className = "ButtonDelete";
            deleteButton.addEventListener("click", function () { myToDoList.DeleteElementFromToDo(this.parentElement); }); 
            listElement.appendChild(deleteButton);

            var doneButton = document.createElement("div");
            doneButton.className = "ButtonDone";
            doneButton.addEventListener("click", function () { myToDoList.MoveToDoneList(this.parentElement); });
            listElement.appendChild(doneButton);

            this.myToDo.push(toDoText);
            this.myToDoList.appendChild(listElement);

            window.getComputedStyle(listElement).opacity;
            listElement.appendChild(textNode);


            addTextInput.style.display = 'none';
            addTextPlus.style.display = 'block';

            this.SaveToLocalStorage();

        }
        else 
        {
            alert("Can't add empty To Do's");
        }
    }

    this.AddTextVisibility = function()
    {
        addTextInput.style.display = 'flex';
        addTextPlus.style.display = 'none';
    }

    this.DeleteElementFromToDo = function(item) 
    {
        //Find Array Index, make into function using the same code twice now
        for (var i = 0; i < item.childNodes.length; i++) 
        {
            if (item.childNodes[i].className == "ArrayIndex") 
            {
                this.myToDo.splice(item.childNodes[i].innerHTML, 1);
                break;
            }        
        }

        this.myToDoList.removeChild(item);
        item.className += 'out';

        this.ReCreateArrayIndexesofToDoList();

        this.SaveToLocalStorage();

    }

    this.ReCreateArrayIndexesofToDoList = function()
    {
        this.myToDoCounter = 0;
        for (var i = 0; i < this.myToDoList.childNodes.length; i++) 
        {
            for (var j = 0; j < this.myToDoList.childNodes[i].childNodes.length; j++) 
            {
                if (this.myToDoList.childNodes[i].childNodes[j].className == "ArrayIndex") 
                {
                    this.myToDoList.childNodes[i].childNodes[j].innerHTML = this.myToDoCounter;
                    this.myToDoCounter++;
                    break;
                }
            }
        }
    }

    this.MoveToDoneList = function(item) 
    {   
        //Find Array Index, make into function using the same code twice now
        var arrayIndex = -1;
        for (var i = 0; i < item.childNodes.length; i++) 
        {
            if (item.childNodes[i].className == "ArrayIndex") 
            {
                var arrayIndex = item.childNodes[i].innerHTML;
                break;
            }        
        }

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

        
        this.myDoneToDo.push(this.myToDo[arrayIndex]);
        this.myToDo.splice(arrayIndex, 1);
    
        this.ReCreateArrayIndexesofToDoList();
        
        this.SaveToLocalStorage();

    }


    this.SaveToLocalStorage = function(aDoneListFlag)
    {
        //Delete Old Posts
        this.DeleteFromLocalStorage();

        localStorage.setItem("ListToDo", JSON.stringify(this.myToDo));

        //console.log("LS TDo List: " + this.myToDo);

        localStorage.setItem("ListDone", JSON.stringify(this.myDoneToDo));

        //console.log("LS Done List: " + this.myDoneToDo);
    }

    this.LoadFromLocalStorage = function()
    {
  
        //console.log(localStorage.getItem("ListToDo"));

        var toDos = JSON.parse(localStorage.getItem("ListToDo"));

        if (toDos != null) 
        {

            for (var val of toDos) 
            {
                var listElement = document.createElement("li");

                var textNode = document.createTextNode(val);
                listElement.className = 'fade';


                var indexDiv = document.createElement("div");
                indexDiv.className = "ArrayIndex";
                var indexNode = document.createTextNode(this.myToDoCounter);
                indexDiv.appendChild(indexNode);
                listElement.appendChild(indexDiv);

                this.myToDoCounter++;

                var deleteButton = document.createElement("div");
                deleteButton.className = "ButtonDelete";
                deleteButton.addEventListener("click", function () { myToDoList.DeleteElementFromToDo(this.parentElement); });
                listElement.appendChild(deleteButton);

                var doneButton = document.createElement("div");
                doneButton.className = "ButtonDone";
                doneButton.addEventListener("click", function () { myToDoList.MoveToDoneList(this.parentElement); });
                listElement.appendChild(doneButton);

                this.myToDo.push(val);
                this.myToDoList.appendChild(listElement);

                window.getComputedStyle(listElement).opacity;
                listElement.appendChild(textNode);
            }
        }

        //console.log(localStorage.getItem("ListDone"));

        var dones = JSON.parse(localStorage.getItem("ListDone"));
        if (dones != null)
        {
            for (var val of dones) 
            {
                var listElement = document.createElement("li");

                var textNode = document.createTextNode(val);
                listElement.className = 'fade';

                var indexDiv = document.createElement("div");
                indexDiv.className = "ArrayIndex";
                var indexNode = document.createTextNode(this.myDoneCounter);
                indexDiv.appendChild(indexNode);
                listElement.appendChild(indexDiv);

                this.myDoneCounter++;

                this.myDoneToDo.push(val);
                this.myDoneList.appendChild(listElement);

                window.getComputedStyle(listElement).opacity;
                listElement.appendChild(textNode);
            }
        }   
    }

    this.DeleteFromLocalStorage = function()
    {
        localStorage.removeItem("ListToDo");
    }

    this.ClearLSDoneList = function()
    {
        localStorage.removeItem("ListDone");
    }

    /*this.FindArrayIndexOfItem = function(item)
    {
        for (var i = 0; i < item.childNodes.length; i++) 
        {
            if (item.childNodes[i].className == "ArrayIndex") 
            {
                return i;
            }        
        }
    }
    */
}


