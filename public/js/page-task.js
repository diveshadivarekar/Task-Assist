// page-task.js
//( include code ref of view_task.js and add_task.js)

//to view the task
document.addEventListener("DOMContentLoaded", () => {
  const taskDataList = document.getElementById("taskdiv");
  let taskcount = 0;

  // Fetch task data from tasks.json
  fetch("/task-data")
    .then((response) => response.json())
    .then(async (data) => {
      for (const file of data) {
        if (file.name !== "tasks.json") {
          continue;
        }
        try {
          const fileId = file.id;
          const response = await fetch(`/task-data/${fileId}`);
          const task = await response.json();

          if (data.length === 0) {
            taskDataList.innerHTML = "<p>No task data available.</p>";
          } else {
            taskcount++;
            if (task.status === "completed") {
              continue;
            }
            const taskItem = document.createElement("div");
            taskItem.className = "col-lg-12";
            taskItem.innerHTML = `
              <div class="col-lg-12">
                          <div class="card card-widget task-card">
                            <div class="card-body">
                              <div
                                class="d-flex flex-wrap align-items-center justify-content-between"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="custom-control custom-task custom-checkbox custom-control-inline"
                                  >
                                  <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck${taskcount}"
                                  ${
                                    task.status === "completed" ? "checked" : ""
                                  }
                              />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck${taskcount}"
                                    ></label>
                                  </div>
                                  <div>
                                    <h5 class="mb-2">
                                      ${task.taskName}
                                    </h5>
                                    <div class="media align-items-center">
                                      <div class="btn bg-body mr-3">
                                        <i class="ri-align-justify mr-2"></i>${
                                          task.checklist.length -
                                          task.checklist.length
                                        }/${task.checklist.length}
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                                <div class="media align-items-center mt-md-0 mt-3">
                                ${
                                  task.project
                                    ? `<a href="#" class="btn bg-primary-light mr-3">${task.project}</a>`
                                    : ""
                                }
                                
                                  ${
                                    task.category
                                      ? `<a href="#" class="btn bg-secondary-light mr-3">${task.category}</a>`
                                      : ""
                                  }
                                  
                                  <a
                                    class="btn bg-secondary-light"
                                    data-toggle="collapse"
                                    href="#collapseEdit${taskcount}"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="collapseEdit${taskcount}"
                                    ><i class="ri-edit-box-line m-0"></i
                                  ></a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="collapse" id="collapseEdit${taskcount}">
                            <div class="card card-list task-card">
                              <div
                                class="card-header d-flex align-items-center justify-content-between px-0 mx-3"
                              >
                                <div class="header-title">
                                  <div
                                    class="custom-control custom-checkbox custom-control-inline"
                                  >
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck${taskcount}"
                                    />
                                    <label
                                      class="custom-control-label h5"
                                      for="customCheck${taskcount}"
                                      >Mark as done</label
                                    >
                                  </div>
                                </div>
                                <div>
                                <a href="#" class="btn btn-primary mr-3" onclick='updateFile("${
                                  file.id
                                }",${taskcount})'>Save</a>
                                <a href="#" class="btn btn-primary" onclick='deleteFile("${
                                  file.id
                                }")'>Delete</a>
                                </div>
                              </div>
                              <div class="card-body">
                                <div class="form-group mb-3 position-relative">
                                  <input
                                    type="text"
                                    class="form-control bg-white"
                                    id = "taskNameinfo"
                                    value="${task.taskName}"
                                  />
                                  <a
                                    href="#"
                                    class="task-edit task-simple-edit text-body"
                                    ><i class="ri-edit-box-line"></i
                                  ></a>
                                </div>
                                <div class="card mb-3">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-lg-6">
                                        <div class="form-group mb-0">
                                          <label for="exampleInputText2" class="h5"
                                            >Memebers</label
                                          >
                                            <input
                                              type="text"
                                              class="form-control bg-white"
                                              id= "assignedTo"
                                              value="${task.assignedTo}"
                                            />
                                        </div>
                                      </div>
                                      <div class="col-lg-6">
                                        <div class="form-group mb-0">
                                          <label for="exampleInputText3" class="h5"
                                            >Due Dates*</label
                                          >
                                          <input
                                            type="date"
                                            class="form-control"
                                            id="dueDate"
                                            value="${task.dueDate}"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="card mb-3">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-lg-6">
                                        <h5 class="mb-2">Description</h5>
                                        <p class="mb-0">
                                          <input
                                            type="text"
                                            class="form-control bg-white"
                                            id="description"
                                            value="${task.description}"
                                          />
                                        
                                        </p>
                                      </div>
                                      <div class="col-lg-6">
                                        <h5 class="mb-2">Checklist</h5>
                                        <div class="row">
                                          <div class="col-lg-6">
                                          <div id ="checklist"
                                          class="custom-control custom-checkbox custom-control-inline mr-0"
                                        >
                                          <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck1"
                                          />
                                          <label
                                            class="custom-control-label mb-1"
                                            for="customCheck1"
                                            >${task.checklist}</label
                                          >
                                        </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
    
                    
                  `;
            taskDataList.appendChild(taskItem);
          }
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
    })
    .catch((error) => console.error("Error fetching task data:", error));
});

async function updateFile(fileId, taskcount) {
  // console.log(fileId);
  try {
    const response = await fetch(`/task-data/${fileId}`);
    const task = await response.json();

    let cbStatus = document.getElementById(`customCheck${taskcount}`).checked;
    newValue = task;

    newValue.status = cbStatus ? "completed" : "in progress" || "open";
    newValue.taskName = document.getElementById("taskNameinfo").value;
    newValue.assignedTo = document.getElementById("assignedTo").value;
    newValue.dueDate = document.getElementById("dueDate").value;
    newValue.category = document.getElementById("category").value;
    newValue.project = document.getElementById("project").value;
    newValue.description = document.getElementById("description").value;
    // newValue.checklist = task.checklist;

    deleteFile(fileId, (reload = false));
    updateTask(newValue);
    // console.log(task);
    // console.log("updated and created new file");
  } catch (error) {
    console.log(`no data found for ${fileId}`);
  }
  // console.log("you have clicked the save button");
}

function deleteFile(fileId, reload = true) {
  fetch(`/delete-file/${fileId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response as needed
    })
    .catch((error) => {
      console.error("Error deleting file:", error);
    });
  if (reload) {
    location.reload();
  }
}

function convertToChecklist(val, containerId) {
  try {
    // Parse the input string as a JSON array
    console.log("value", val);
    const valuesArray = JSON.parse(JSON.stringify(val));
    console.log(valuesArray);

    // Check if valuesArray is an array
    if (Array.isArray(valuesArray)) {
      // Get the checklist container
      const checklistContainer = document.getElementById(containerId);
      console.log(containerId);

      // Clear existing checklist items
      // checklistContainer.innerHTML = "";

      // Create HTML string for checklist items
      const checklistHTML = valuesArray
        .map((value) => `<li>${value.trim()}</li>`)
        .join("");
      console.log(checklistHTML);
      // Append the checklist items to the container
      checklistContainer.appendChild(`<ul>${checklistHTML}</ul>`);
    } else {
      console.error("Invalid input format. Expected an array:", valuesArray);
    }
  } catch (error) {
    console.error("Error parsing input as JSON:", error);
  }
}

// to add task
function addTask() {
  // const status = document.getElementById("status").value || "open";
  const taskName = document.getElementById("taskName").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const dueDate = document.getElementById("dueDate").value;
  const category = document.getElementById("category").value;
  const project = document.getElementById("project").value;
  const description = document.getElementById("description").value;
  // const checklist = document
  //   .getElementById("checklist")
  //   .value.split(",")
  //   .map((item) => item.trim());

  // const attachments = document
  //   .getElementById("attachments")
  //   .value.split(",")
  //   .map((item) => item.trim());

  const taskData = {
    status: "open",
    taskName: taskName,
    assignedTo: assignedTo,
    dueDate: dueDate,
    category: category,
    project: project,
    description: description,
    checklist: "future feature",
    // attachments: attachments,
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
      window.location.reload();
      // window.location.href = "#";
    })
    .catch((error) => console.error("Error adding task:", error));
}

function updateTask(oldValues) {
  const taskData = {
    status: oldValues.status || "open",
    taskName: oldValues.taskName,
    assignedTo: oldValues.assignedTo,
    dueDate: oldValues.dueDate,
    category: oldValues.category,
    project: oldValues.project,
    description: oldValues.description,
    checklist: oldValues.checklist || "future feature",
    // attachments: attachments,
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
      window.location.reload();
    })
    .catch((error) => console.error("Error adding task:", error));
}
