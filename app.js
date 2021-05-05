const form =document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll =document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");
let items;

loadItems();

eventListenners();


function addNewItem(e){


    if(input.value ===""){
        alert("add new item");
      
    } 
    createItem(input.value);

    setItemToLS(input.value);
 


input.value="";

e.preventDefault();
  
};

function eventListenners(){
    form.addEventListener("submit" ,addNewItem);

    tasklist.addEventListener("click", deleteitem)
    btnDeleteAll.addEventListener("click", deleteallitem)
};

function loadItems(){

    items = getItemsFromLS();
items.forEach(function(item){
    createItem(item);
})
}


function getItemsFromLS(){
if(localStorage.getItem("items")===null){
    items = [];
} else{
    items= JSON.parse(localStorage.getItem("items"));
}
return items;

}

function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("items",JSON.stringify (items));
}


function deleteitemFromLS(text){

    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item ===text){
        items.splice(index,1)
    }
    });
    localStorage.setItem("items", JSON.stringify(items));
}
function createItem(text){
    const li = document.createElement("li");

    li.className="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
     
    
    ///create li
    const a = document.createElement("a");
    a.classList= "delete-item float-right";
  
    a.innerHTML='<i class="far fa-trash-alt"></i>';
    
    
    
    li.appendChild(a);
    
    
    tasklist.appendChild(li);
}



function deleteitem(e){


 
    if(e.target.className==="far fa-trash-alt"){
        if(confirm("Silmek istediğinize emin misiniz ?")){ 
    e.target.parentElement.parentElement.remove();

    deleteitemFromLS(e.target.parentElement.parentElement.textContent);
    }}
e.preventDefault();
}


function deleteallitem (e){
    if (confirm('Silmek istediğinize emin misiniz ?')) {

        tasklist.innerHTML = '';}
        localStorage.clear(); 
       
e.preventDefault();

}
