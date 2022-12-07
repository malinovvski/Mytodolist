let list = [];
const todoInput = document.querySelector("#todoInput");
const btnAdd = document.querySelector("#btn-add");
const DivContainer = document.getElementById("task-container");
const filterOption = document.querySelector("#filterid")
let id = 0;
let count = 0;      //dorobić licznik
let click = "All";


btnAdd.addEventListener("click", () => {
    AddNew();
    rerender();
});



function AddNew() {
    const toDo = todoInput.value;
    list.push(
        {
            name: toDo,
            id: id++,
            done: false,
            trash: false,
        }
    );
}

function rerender() {
    

    DivContainer.innerHTML = "";


    let filtered = list.filter((item) => {
        if(click  === "Active"){
            return !item.done;
        }
        if(click === "Completed"){
            return item.done;
        }
        return true;

    });



    filtered.forEach((todo) => {

        if (todo.trash) {
            return;
        }

        // dodawanie diva i przenoszenie wartości wpisanej
        const newDiv = document.createElement("div");
        newDiv.classList.add('newBox');
        newDiv.innerText = todo.name;
        newDiv.setAttribute("id", `newDiv${todo.id}`);


        //dodawanie przycisku skonczonego taska


        const newButton = document.createElement("input");
        newButton.setAttribute("type", "checkbox");
        if (todo.done) {
            newButton.setAttribute("checked", "true");
        }
        newButton.setAttribute("id", `newButton${todo.id}`)
        newButton.classList.add("complete-btn");

        if (todo.done) {
            newDiv.classList.add("crossed");

        } else {
            newDiv.classList.remove("crossed");
        }
        newButton.addEventListener("change", (event) => checkElement(event, todo));


        //przycisk kasowania taska

        const delButton = document.createElement("button");
        delButton.setAttribute("id", `delButton${todo.id}`)
        delButton.classList.add("deleteButton");
        delButton.addEventListener("click", (d) => deleteElement(d, todo));



        DivContainer.appendChild(newDiv);
        newDiv.appendChild(newButton);
        newDiv.appendChild(delButton);


        //przekreślanie 
        function checkElement(event, toDoItem) {

            let checkboxElement = event.target;
            toDoItem.done = checkboxElement.checked;

            rerender();
        }

        //kasowanie

        function deleteElement(d, todoDel) {

            todoDel.trash = true;
            rerender();
        }




    });


    
};



function showAll() {
    click = "All";
    rerender()
}

function showActive() {
    click = "Active";
    rerender();
}

function showCompleted() {
    click = "Completed";
    rerender()

}









