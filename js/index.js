window.addEventListener("load", () => {
  const btnAddTask = document.querySelector("#addTask");
  const taskContainer = document.querySelector("#taskContainer");
  let taskObj = {};

  if (localStorage.getItem("tasks") != null) {
    taskObj = JSON.parse(localStorage.getItem("tasks"));
    console.log(taskObj);
    for (key in taskObj) {
      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("id", "task");

      const taskCheckBox = document.createElement("input");
      taskCheckBox.setAttribute("type", "checkbox");
      taskCheckBox.setAttribute("id", "checkTaskDone");
      taskCheckBox.checked = taskObj[key];

      taskDiv.appendChild(taskCheckBox);

      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("class", "taskName");
      taskLabel.textContent = key;
      taskCheckBox.checked ? taskLabel.style.textDecoration = "line-through" :taskLabel.style.textDecoration = "none"
      taskDiv.appendChild(taskLabel);

      const iconDelete = document.createElement("span");
      iconDelete.setAttribute("id", "taskDelete");
      iconDelete.setAttribute("class", "fa-solid fa-xmark");
      taskDiv.appendChild(iconDelete);

      taskContainer.appendChild(taskDiv);
    }
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
    if(taskName.length > 0 && taskName.length < 38){
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
        let parentNode = allTasks[i].parentElement; //get parent node of clicked element
        parentNode.remove(); //delete that parent node\
      saveTasks();

      });
    }

    const allCheckBox = document.querySelectorAll("#checkTaskDone");
    for (let i = 0; i < allCheckBox.length; i++) {
      allCheckBox[i].addEventListener("change", () => {
        /* get the next element my label with the text */
        const taskLabel = allCheckBox[i].nextElementSibling;
        taskLabel.style.textDecoration = allCheckBox[i].checked
          ? "line-through"
          : "none";
      saveTasks();

      });
    }
  });

  function saveTasks() {
    const tasksDiv = document.querySelectorAll("#task");
    const taskObj = {};
    for (let i = 0; i < tasksDiv.length; i++) {
      const taskLabel = tasksDiv[i].querySelector("label");
      const taskCheckBox = tasksDiv[i].querySelector("input");
      taskObj[taskLabel.textContent] = taskCheckBox.checked;

      const stringifiedObj = JSON.stringify(taskObj);
      localStorage.setItem("tasks", stringifiedObj);
    }
  }
});
