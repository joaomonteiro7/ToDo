window.addEventListener("load", () => {
  const btnAddTask = document.querySelector("#addTask");
  const taskContainer = document.querySelector("#taskContainer");
  let taskObj = {};

  /* where i check if local sotorage have tasks 
     and create the elements to show the values
     on page
  */
  if (localStorage.getItem("tasks") != null) {
    /* getting the items from localStorage thar are saved in JSON format 
       and transform into one obj
    */
    taskObj = JSON.parse(localStorage.getItem("tasks"));
    Object.keys(taskObj).forEach((key) => {
      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("id", "task");

      /* create check box */
      const taskCheckBox = document.createElement("input");
      taskCheckBox.setAttribute("type", "checkbox");
      taskCheckBox.setAttribute("id", "checkTaskDone");
      taskCheckBox.checked = taskObj[key];


      /* create label(task name) */
      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("class", "taskName");
      taskLabel.textContent = key;

      /* check if checkBox are checked or no to add text decoration on task name */
      taskCheckBox.checked
        ? (taskLabel.style.textDecoration = "line-through")
        : (taskLabel.style.textDecoration = "none");

      /* create icon delete using font awasome */
      const iconDelete = document.createElement("span");
      iconDelete.setAttribute("id", "taskDelete");
      iconDelete.setAttribute("class", "fa-solid fa-xmark");

      /* add all elements into div that store all tasks */
      taskDiv.appendChild(taskCheckBox);
      taskDiv.appendChild(taskLabel);
      taskDiv.appendChild(iconDelete);

      /* add task div into the task container that have all divs with all tasks */
      taskContainer.appendChild(taskDiv);
    });
  }

  btnAddTask.addEventListener("click", () => {
    /* individual div for tasks */
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("id", "task");

    /* create checkbox and give id*/
    const taskCheckBox = document.createElement("input");
    taskCheckBox.setAttribute("type", "checkbox");
    taskCheckBox.setAttribute("id", "checkTaskDone");
    taskDiv.appendChild(taskCheckBox);

    /* get text value form input */
    const taskName = document.querySelector("#taskInput").value;
    if (taskName.length > 0 && taskName.length < 38) {
      /* create a label for task name */
      const taskLabel = document.createElement("label");
      /* give an id to the label */
      taskLabel.setAttribute("class", "taskName");
      /* write input value on label */
      taskLabel.textContent = taskName;

      /* add label to the container */
      taskDiv.appendChild(taskLabel);
      /* delete input text */
      document.querySelector("#taskInput").value = "";

      /* create span for icon from font awesome */
      const iconDelete = document.createElement("span");
      iconDelete.setAttribute("id", "taskDelete");
      iconDelete.setAttribute("class", "fa-solid fa-xmark");
      taskDiv.appendChild(iconDelete);

      /* add the individual div to the task container */
      taskContainer.appendChild(taskDiv);
      saveTasks();
    }
  });

  document.body.addEventListener("click", () => {
    const allTasks = document.querySelectorAll("#taskDelete");
    for (let i = 0; i < allTasks.length; i++) {

      allTasks[i].addEventListener("click", () => {
        /* get the parent where the incon delete clicked belongs and del all 
           elements from parent of the incon delete clicked 
        */
        let parentNode = allTasks[i].parentElement; 
        parentNode.remove();
        saveTasks();
      });
    }

    const allCheckBox = document.querySelectorAll("#checkTaskDone");
    for (let i = 0; i < allCheckBox.length; i++) {
      allCheckBox[i].addEventListener("change", () => {
        /* get the next element after the checkBox 
           checkBox -> sibling
        */
        const taskLabel = allCheckBox[i].nextElementSibling;
        /* when checkBox is clicked give text decoration to the task name(label) */
        taskLabel.style.textDecoration = allCheckBox[i].checked
        ? "line-through"
        : "none";
        saveTasks();
      });
    }
  });

  function saveTasks() {
    /* get all elements(uin this case is div) with the id task */
    const tasksDiv = document.querySelectorAll("#task");
    const taskObj = {};
    for (let i = 0; i < tasksDiv.length; i++) {
      const taskLabel = tasksDiv[i].querySelector("label");
      const taskCheckBox = tasksDiv[i].querySelector("input");
      taskObj[taskLabel.textContent] = taskCheckBox.checked;
      /* saving the obj on localStorage with JSON format */
      const stringifiedObj = JSON.stringify(taskObj);
      localStorage.setItem("tasks", stringifiedObj);
    }
  }
});
