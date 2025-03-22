const addQuery = document.getElementById("writeTask");
const addTask = document.getElementById("add");

let inserted = document.getElementById("inserted");

const searListedQuery = document.getElementById("search");
const filterQuery = document.getElementById("flt");


// searching algorithm
searListedQuery.addEventListener("input", () => {
  let userSearch = searListedQuery.value.toLowerCase();
  let txtForm = JSON.parse(localStorage.getItem("secretData")) || [];
  let searchedTasks = txtForm.filter(task => task.taskTxt.toLowerCase().includes(userSearch));
  inserted.innerHTML = "";
  
  searchedTasks.forEach((eachTask, position) => {
    let mainDiv = document.createElement("div");
    //remove task
    let removeTask = document.createElement("div");
    
    removeTask.classList.add("removeTask");
    removeTask.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    //for time 
    let time = document.createElement("div");
    time.classList.add("time");
    let today = new Date().toLocaleDateString();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString();
    
    
    if (eachTask.date === today) {
      time.innerHTML = "Today"
    } else if (eachTask.date === yesterday) {
      time.innerHTML = "Yesterday"
    } else {
      time.innerHTML = eachTask.date;
      
    }
    
    
    mainDiv.classList.add("mainDiv");
    let newTask = document.createElement("div");
    newTask.classList.add("newQuery");
    removeTask.addEventListener("click", () => removeData(position));
    newTask.innerText = eachTask.taskTxt;
    mainDiv.appendChild(newTask);
    mainDiv.appendChild(removeTask);
    mainDiv.appendChild(time);
    inserted.prepend(mainDiv);
  })
})

filterQuery.addEventListener("click", () => {
  let searchPanel = document.createElement("div");
  searchPanel.classList.add("filterPanel");
  searchPanel.innerHTML = `<div class="button"><button type="reset" id="closeBtn"><span class="material-symbols-outlined">close</span></button></div><div class="filterInput"><span class="material-symbols-outlined" id="calLogo">calendar_month</span><input type="date" id="dateFind"/></div><div class="theme"><label for="changeTheme">theme</label><input type="checkbox" id="changeTheme"/></div>`;
  
  mainPage.appendChild(searchPanel);
  let close = document.getElementById("closeBtn");
  close.addEventListener("click", () => {
    searchPanel.remove();
  })
  
  let changeTheme = document.getElementById("changeTheme");
  
  //theme function 
  changeTheme.addEventListener("input",() =>{
    
    if(!changeTheme.checked){
      document.body.style.backgroundColor = "#45454D";
    }else if(changeTheme.checked){
      document.body.style.backgroundColor = "#787878";
      
    }
  })
  
  let findDate = document.getElementById("dateFind");
  
  findDate.addEventListener("input", () => {
    
    let userDateInput = findDate.value.trim();
    let txtForm = JSON.parse(localStorage.getItem("secretData")) || [];
    let searchedTasks = txtForm.filter(task => userDateInput.includes(task.date.slice(-4) + "-" + task.date.slice(-7, -5) + "-" + task.date.slice(0, -8)));
    
    inserted.innerHTML = "";
    
    
    searchedTasks.forEach((eachTask, position) => {
      let mainDiv = document.createElement("div");
      //remove task
      let removeTask = document.createElement("div");
      
      removeTask.classList.add("removeTask");
      removeTask.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
      //for time 
      let time = document.createElement("div");
      time.classList.add("time");
      let today = new Date().toLocaleDateString();
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = yesterday.toLocaleDateString();
      
      
      if (eachTask.date === today) {
        time.innerHTML = "Today"
      } else if (eachTask.date === yesterday) {
        time.innerHTML = "Yesterday"
      } else {
        time.innerHTML = eachTask.date;
        
      }
      
      
      mainDiv.classList.add("mainDiv");
      let newTask = document.createElement("div");
      newTask.classList.add("newQuery");
      removeTask.addEventListener("click", () => removeData(position));
      newTask.innerText = eachTask.taskTxt;
      mainDiv.appendChild(newTask);
      mainDiv.appendChild(removeTask);
      mainDiv.appendChild(time);
      inserted.prepend(mainDiv);
    })
  })
  
});



// start logic
let mainPage = document.querySelector(".main_page_todo");
addTask.addEventListener("click", () => {
  let taskValue = addQuery.value.trim();
  if (taskValue !== "") {
    let txtForm = JSON.parse(localStorage.getItem("secretData")) || [];
    let timing = new Date().toLocaleDateString();
    txtForm.push({ taskTxt: taskValue, date: timing });
    
    localStorage.setItem("secretData", JSON.stringify(txtForm));
    addQuery.value = "";
    let addedTask = document.createElement("div");
    addedTask.classList.add("addedTask");
    addedTask.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Added Successfully Task!`;
    setTimeout(() => {
      addedTask.remove();
    }, 1000)
    mainPage.appendChild(addedTask);
    loadPage();
  } else {
    let originalClr = addQuery.style.borderColor;
    addQuery.style.borderColor = "#CB5A0A";
    navigator.vibrate([50, 100, 50]);
    let error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = `<span class="material-symbols-outlined">error</span>Empty can't be`;
    setTimeout(() => {
      addQuery.style.borderColor = originalClr;
      error.remove();
    }, 1000)
    mainPage.appendChild(error);
  }
})

function loadPage() {
  let txtForm = JSON.parse(localStorage.getItem("secretData")) || [];
  inserted.innerHTML = "";
  
  txtForm.forEach((eachTask, position) => {
    let mainDiv = document.createElement("div");
    //remove task
    let removeTask = document.createElement("div");
    
    removeTask.classList.add("removeTask");
    removeTask.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    //for time 
    let time = document.createElement("div");
    time.classList.add("time");
    let today = new Date().toLocaleDateString();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString();
    
    
    if (eachTask.date === today) {
      time.innerHTML = "Today"
    } else if (eachTask.date === yesterday) {
      time.innerHTML = "Yesterday"
    } else {
      time.innerHTML = eachTask.date;
      
    }
    
    
    mainDiv.classList.add("mainDiv");
    let newTask = document.createElement("div");
    newTask.classList.add("newQuery");
    removeTask.addEventListener("click", () => removeData(position));
    newTask.innerText = eachTask.taskTxt;
    mainDiv.appendChild(newTask);
    mainDiv.appendChild(removeTask);
    mainDiv.appendChild(time);
    inserted.prepend(mainDiv);
  })
}

function removeData(position) {
  if (!confirm("Are you sure you want to delete this task!")) return;
  let txtForm = JSON.parse(localStorage.getItem("secretData")) || [];
  txtForm.splice(position, 1);
  localStorage.setItem("secretData", JSON.stringify(txtForm));
  let deleteTask = document.createElement("div");
  deleteTask.id = "deleteTask";
  deleteTask.innerHTML = `<span class="material-symbols-outlined">
delete_forever
</span> deleted successfully!`;
  setTimeout(() => {
    deleteTask.remove();
  }, 1000)
  mainPage.appendChild(deleteTask);
  loadPage();
}
document.addEventListener("DOMContentLoaded", loadPage());