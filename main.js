 
    var label=document.getElementById("lblText");
    var formContainer = document.getElementById("userForm");

    
    var addBtn = document.querySelector(".add-btn");
    var editBtn = document.querySelectorAll(".edit-btn");

 
   
    var addForm = formContainer.querySelector("form");

    
    addBtn.onclick = function() {
label.innerText="addUser";
        formContainer.style.display = "block";
    }

    addForm.onsubmit = function(e) {
        e.preventDefault();
        formContainer.style.display = "none";
    }

 
    window.onclick = function(event) {
        if (event.target == formContainer) {
            formContainer.style.display = "none";
        }
    }

var table=document.getElementById("table");

function printUser(id,name,email){
var tbody=` <tr>
<td>${id.toString()}</td>
<td>${name}</td>
<td>${email}</td>
<td class="actions">
    <button class="btn edit-btn">Edit</button>
    <button class="btn delete-btn" >Delete</button>
</td>
</tr>`
table.insertAdjacentHTML('beforeend',tbody);
}
var ID=0;
function updateUser(id,name,email){
    var users=getUsersFromLocalStorage();
    users.forEach(function(element){
        if(element.id===id){
            element.name=name;
            element.email=email;
            setUsersToLocalStorage(users);
            return true;
        }
    })
return false;
}
function addUser(name,email){
    var users=getUsersFromLocalStorage();
   let Id=users.length===0?0:users[users.length-1].id+1;
    let user={id:Id,name:name,email:email};
    users.push(user);
    setUsersToLocalStorage(users);
}
function getUsersFromLocalStorage(){
    var users;
    if(localStorage.length!==0)
     users=JSON.parse(localStorage.getItem("users"));
    else
    users=[];
     return users;
}
function setUsersToLocalStorage(users){
   localStorage.setItem("users",JSON.stringify(users));
}
function printAllUsers(){
    var users=getUsersFromLocalStorage();
    users.forEach(function(user){
        printUser(user.id,user.name,user.email);
    })
    clickBtnEdit();
    clickBtnDelete();
}

function addOrEdit(){
    var name=document.getElementById("nameUser").value;
    var email=document.getElementById("emailUser").value;
    if(label.innerText==="addUser"){
        addUser(name,email); 
       table.innerHTML="";
        printAllUsers();
     
    }
    else{
        updateUser(ID,name,email)
       table.innerHTML="";
        printAllUsers();
      
    }
    }
function clickBtnEdit(){
var tableElements=document.querySelectorAll("table td");
tableElements.forEach(function(element){
    element.addEventListener("click",function(event){
      if(event.target.className.indexOf("edit-btn")!==-1)
{
   ID=parseInt(event.target.parentNode.parentNode.cells[0].innerText); 
            alert("success");
        
            formContainer.style.display = "block";
}

})
})
}
function clickBtnDelete(){
    var tableElements=document.querySelectorAll("table td");
    tableElements.forEach(function(element){
        element.addEventListener("click",function(event){
          if(event.target.className.indexOf("delete-btn")!==-1)
    {
       ID=parseInt(event.target.parentNode.parentNode.cells[0].innerText); 
              deleteUser(ID)
                table.removeChild(event.target.parentNode.parentNode);
                
              
    }
    })
    })
}
function deleteUser(id){
var users=getUsersFromLocalStorage();
for (let i = 0; i < users.length; i++) {
    if(users[i].id===id){
        users.splice(i,1);
        setUsersToLocalStorage(users);
        return true;
    }
    
}
return false;
}

printAllUsers();
function returnAllUsersFilterByName(name){
    var users=getUsersFromLocalStorage();
    return users.filter(function(user){
        return user.name.indexOf(name)!==-1;
    })
}
function printFilterUsers(users){
    users.forEach(function(user){
        console.log(user);
        printUser(user.id,user.name,user.email);
    })
}
function filterByName(){
    var searchName=document.getElementById("search").value;
    var users=returnAllUsersFilterByName(searchName);
    console.log(users);
    table.innerHTML="";
    printFilterUsers(users);
}