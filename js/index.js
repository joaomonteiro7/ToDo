window.addEventListener("load", () => {
  const btnAddTask = document.querySelector("#addTask");
  const taskContainer = document.querySelector("#taskContainer");

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
  });

  document.body.addEventListener("click", () => {
    const allTasks = document.querySelectorAll("#taskDelete");
    for (let i = 0; i < allTasks.length; i++) {
      allTasks[i].addEventListener("click", () => {
        let parentNode = allTasks[i].parentElement; //get parent node of clicked element
        parentNode.remove(); //delete that parent node
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
      });
    }
  });
});
