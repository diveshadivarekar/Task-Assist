// page-project.js

//to view the project
document.addEventListener("DOMContentLoaded", () => {
  const taskDataList = document.getElementById("projectdiv");
  let taskcount = 0;

  // Fetch task data from tasks.json
  fetch("/task-data")
    .then((response) => response.json())
    .then(async (data) => {
      let map = new Map();
      for (const file of data) {
        if (file.name !== "tasks.json") {
          continue;
        }
        try {
          const fileId = file.id;
          const response = await fetch(`/task-data/${fileId}`);
          const task = await response.json();

          if (data.length === 0) {
            taskDataList.innerHTML = "<p>No Project data available.</p>";
          } else {
            if (!task.project) {
              continue;
            }
            // console.log(task.project);
            // Example using a Map

            let elements = [task.project];

            for (let element of elements) {
              if (map.has(element)) {
                // Element already exists in the Map, increment count
                map.set(element, map.get(element) + 1);
              } else {
                // Element doesn't exist in the Map, initialize count to 1
                map.set(element, 1);
              }
            }

            // Display the count for each element
            // map.forEach((count, key) => {
            //   console.log(`Element: ${key}, Count: ${count}`);
            // });

            if (map.get(task.project) > 1) {
              break;
            }

            taskcount++;

            const taskItem = document.createElement("div");
            taskItem.className = "col-md-6 col-lg-4";
            taskItem.style.textAlign = "center";
            taskItem.innerHTML = `
            
                  <div class="card card-block card-stretch card-height">
                    <div class="card-body">
                      <div
                        class="d-flex align-items-center justify-content-between mb-4"
                      >
                        <div
                          id="circle-progress-01"
                          class="circle-progress-01 circle-progress circle-progress-primary"
                          data-min-value="0"
                          data-max-value="100"
                          data-value="25"
                          data-type="percent"
                        ></div>
                      </div>
                      <h5 class="mb-1">${task.project}</h5>
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
      window.location.href = "#";
    })
    .catch((error) => console.error("Error adding task:", error));
}

{
  /* <div class="col-lg-12">
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
                                      id="customCheck01"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck01"
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
                                <a href="#" class="btn bg-primary-light mr-3"
                                    >${task.project}</a
                                  >
                                  <a href="#" class="btn bg-secondary-light mr-3"
                                    >${task.category}</a
                                  >
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
                                      id="customCheck05"
                                    />
                                    <label
                                      class="custom-control-label h5"
                                      for="customCheck05"
                                      >Mark as done</label
                                    >
                                  </div>
                                </div>
                                <div>
                                  <a href="#" class="btn bg-secondary-light"
                                    >${task.category}</a
                                  >
                                </div>
                              </div>
                              <div class="card-body">
                                <div class="form-group mb-3 position-relative">
                                  <input
                                    type="text"
                                    class="form-control bg-white"
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
                                            id="exampleInputText3"
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
                        </div> */
}
