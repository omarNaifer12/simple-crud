    // Get the modal
    var label=document.getElementById("lblText");
    var formContainer = document.getElementById("userForm");

    // Get the button that opens the modal
    var addBtn = document.querySelector(".add-btn");
    var editBtn = document.querySelectorAll(".edit-btn");

    // Get the <span> element that closes the modal
   
    var addForm = formContainer.querySelector("form");

    // When the user clicks the button, open the modal
    addBtn.onclick = function() {
label.innerText="addUser";
        formContainer.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    addForm.onsubmit = function(e) {
        e.preventDefault();
        formContainer.style.display = "none";
    }

    // When the user clicks outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == formContainer) {
            formContainer.style.display = "none";
        }
    }

var table=document.getElementById("table");
function addRow(id,name,email){
 
let row=table.insertRow(-1);
let c0=row.insertCell(0);
let c1=row.insertCell(1);
let c2=row.insertCell(2);
let c00= document.createTextNode(id.toString);
let c11= document.createTextNode(name);
let c22= document.createTextNode(email);
c0.appendChild(c00)
c1.appendChild(c11)
c2.appendChild(c22)
}
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
    
function btnEdit(event){
console.log(event);
}
function btnDelete(event){
    console.log(event);
}
function clickBtnEdit(){
var tableElements=document.querySelectorAll("table td");
tableElements.forEach(function(element){
    element.addEventListener("click",function(event){
      if(event.target.className.indexOf("edit-btn")!==-1)
{
   ID=parseInt(event.target.parentNode.parentNode.cells[0].innerText); 
            alert("success");
            console.log(this);
            label.innerText="editUser";
            formContainer.style.display = "block";
}
else
    {
        alert("error");
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
    else
        {
            alert("error");
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