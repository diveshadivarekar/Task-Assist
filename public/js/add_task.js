// add_task.js
function addTask() {
  const status = document.getElementById("status").value;
  const taskName = document.getElementById("taskName").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const dueDate = document.getElementById("dueDate").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const checklist = document
    .getElementById("checklist")
    .value.split(",")
    .map((item) => item.trim());
  const attachments = document
    .getElementById("attachments")
    .value.split(",")
    .map((item) => item.trim());

  const taskData = {
    status: status,
    taskName: taskName,
    assignedTo: assignedTo,
    dueDate: dueDate,
    category: category,
    description: description,
    checklist: checklist,
    attachments: attachments,
  };

  // Send the task data to the server
  fetch("/add-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      // Redirect to the view_tasks.html page
      window.location.href = "view_task.html";
    })
    .catch((error) => console.error("Error adding task:", error));
}
