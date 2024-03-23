//C R U D 



var taskNameInput= document.getElementById("taskNameInput");
var taskTypeInput= document.getElementById("taskTypeInput");
var statusInput= document.getElementById("statusInput");


var taskList=[];

var searchInput=document.getElementById("searchInput");

var updateBtn =document.getElementById("updateBtn");
var addBtn =document.getElementById("addBtn");
var indexUpdate=0;


//-----------------------------------------------//

//Retrieve 

//array of object is JSON --> javascript object notation
if(localStorage.getItem("tasks")!=null){

    taskList=JSON.parse(localStorage.getItem("tasks"));
    displayData();
}

//Create

var Task={
    name: taskNameInput.value,
    type: taskTypeInput.value,
  
    status:statusInput.value,
   }
  

function addTask(){
    Task={
        name: taskNameInput.value,
        type: taskTypeInput.value,
        status:statusInput.value,
       }

   taskList.push(Task);
   localStorage.setItem("tasks",JSON.stringify(taskList))
   clearForm();
   displayData();
   console.log(taskList);
}



function clearForm() {

    taskNameInput.value="";
    taskTypeInput.value="";
    statusInput.value="";

}

//Display


function displayData(){

    var cartona="";
    for( var i=0; i<taskList.length ; i++ ){
        cartona+= ` <tr>
        <td> ${i}</td>
        <td> ${taskList[i].name}</td>
        <td>  ${taskList[i].type} </td>
        <td> <button class= "btn btn-success btn-sm" onclick = " setData(${i}) " >Update</button>
        <button class= "btn btn-danger btn-sm" onclick = " deleteItem(${i}) ">Delete</button> </td>
        <td>  ${taskList[i].status} </td>
        


    </tr> `
    }

   document.getElementById("tablebody").innerHTML=cartona;
}


//Delete

function deleteItem(index){
    taskList.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(taskList));

    displayData();  
}

//Search
//oninput is an event that reacts when pressed any character in input
function Search(){

    var term=searchInput.value;

    var cartona="";
    for( var i=0; i<taskList.length ; i++ ){

        if(taskList[i].name.toLowerCase().includes(term.toLowerCase())){
         
            cartona+= ` <tr>
            <td> ${i}</td>
            <td> ${taskList[i].name}</td>
            <td>  ${taskList[i].type} </td>
            <td> <button class= "btn btn-success btn-sm">Update</button>
            <button class= "btn btn-danger btn-sm" onclick = " deleteItem(${i}) ">Delete</button> </td>
            <td>  ${taskList[i].status} </td>
            
    
    
        </tr> `
        
    
       document.getElementById("tablebody").innerHTML=cartona;
        }
        
    }
}


//Update

function setData(index){

    indexUpdate=index;
 var currentTask=taskList[index];

 taskNameInput.value= currentTask.name;
 taskTypeInput.value= currentTask.type;
 statusInput.value=currentTask.status;

 updateBtn.classList.remove("d-none");
 addBtn.classList.add("d-none")
}

function updateTask(){

    Task={
        name: taskNameInput.value,
        type: taskTypeInput.value,
        status:statusInput.value,
       }

       taskList.splice(indexUpdate, 1, Task);

       displayData();
       localStorage.setItem("tasks",JSON.stringify(taskList));
       clearForm();
       updateBtn.classList.add("d-none");
        addBtn.classList.remove("d-none")
}
