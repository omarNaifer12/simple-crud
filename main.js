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

function addUser(id,name,email){
var tbody=` <tr>
<td>${id.toString()}</td>
<td>${name}</td>
<td>${email}</td>
<td class="actions">
    <button class="btn edit-btn">Edit</button>
    <button class="btn delete-btn">Delete</button>
</td>
</tr>`
table.insertAdjacentHTML('beforeend',tbody);
}


var events={};
var tableElements=document.querySelectorAll("table td");
tableElements.forEach(function(element){
    element.addEventListener("click",function(event){
      if(event.target.className.indexOf("edit-btn")!==-1)
{
    events=event.target.parentNode.parentNode; 
            alert("success");
            label.innerText="editUser";
            formContainer.style.display = "block";
}
    else
    {   
        alert("error");
    } 
    console.log(events);  
    console.log(event) 
    console.log(event.target.className)
})
})
function updateUser(name,
    email){
   events.cells[1].innerText=name;
    events.cells[2].innerText=email;
}
function addOrEdit(){
    var name=document.getElementById("nameUser").value;
var email=document.getElementById("emailUser").value;
if(label.innerText==="addUser"){
    addUser(2,name,email); 
       
}
else{
    updateUser(name,email)
}
}