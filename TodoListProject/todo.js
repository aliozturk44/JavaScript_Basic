//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firsCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){  // Tüm eventleri listelerler
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
    

}

function clearAllTodos(e){
    //Arayüzden todoları temizleme
    if(confirm("Tümünü silmek istediğinizden emin misiniz ?")){
        todoList.innerHTML= ""; //yavaş yöntem

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }



}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadı
            listItem.setAttribute("style","display: none !important");
        }
        else{
            listItem.setAttribute("style","display: block");
        }
    })



}

function addTodo(e){
    const newTodo= todoInput.value.trim();
    const todos = getTodosFromStorage();
    let a = 0;

    todos.forEach(function(e){
        if (newTodo===e){
            a=e;
        }
    })

    


        if(newTodo === ""){
            /*    <div class="alert alert-danger" role="alert">
          A simple danger alert—check it out!
        </div> */
        
                showAlert("danger","Lütfen bir todo girin...");
        
            }
            else if (newTodo === a){
                showAlert("danger","Bir todo 2 kez girilemez...");
            }
           
           
            
             else{ 
                addTodoToUI(newTodo); //Arayüze içindeki todo'yu ekle manasına gelir
                showAlert("success","Todo başarıyla eklendi...");
                addTodoStorage(newTodo);
                
                
                        
        }
        


    e.preventDefault();
}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
       
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim());
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
   
    
    localStorage.setItem("todos",JSON.stringify(todos));
}

function LoadAllTodosToUI(todo){  //storagedaki tüm elemanları sayfa açılır açılmaz ekrana yazdırır
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function getTodosFromStorage(){  //storage'dan todoları alma
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoStorage(newTodo){
   let todos = getTodosFromStorage();

   todos.push(newTodo);

   localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    // alert.appendChild(document.createTextNode(message));
    alert.textContent = message; 

    firsCardBody.appendChild(alert);

    // setTimeout  bu özellikle uyarının kaç saniye kalacağını ayarlayabiliriz.
    // sondaki 1000 sayısı milisaniyeyi ifade etmektedir.

    setTimeout(function(){
        alert.remove()
    },1000);


}

function addTodoToUI(newTodo){ //Aldığı string değeri list item olarak UI'a(arayüze) ekleyecek.
/*
<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
*/

//List item oluşturma
const listItem= document.createElement("li");
listItem.className = "list-group-item d-flex justify-content-between";

//Link oluşturma
const Link = document.createElement("a");
Link.href = "#";
Link.className = "delete-item";
Link.innerHTML = " <i class = 'fa fa-remove'></i>";

//Text Node ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(Link);



// todoList'e ListItem'ı ekleme
todoList.appendChild(listItem);

todoInput.value= "";

}


