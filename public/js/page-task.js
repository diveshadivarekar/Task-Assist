// page-task.js
//( include code ref of view_task.js and add_task.js)

//to view the task
document.addEventListener("DOMContentLoaded", () => {
  const taskDataList = document.getElementById("taskdiv");

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
                                      <div class="btn bg-body">
                                        <i class="ri-survey-line mr-2"></i> ${
                                          task.attachments.length
                                        } 
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="media align-items-center mt-md-0 mt-3">
                                  <a href="#" class="btn bg-secondary-light mr-3"
                                    >${task.category}</a
                                  >
                                  <a
                                    class="btn bg-secondary-light"
                                    data-toggle="collapse"
                                    href="#collapseEdit1"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="collapseEdit1"
                                    ><i class="ri-edit-box-line m-0"></i
                                  ></a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="collapse" id="collapseEdit1">
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
                                    placeholder="${task.taskName}"
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
                                          <select
                                            name="type"
                                            class="selectpicker form-control"
                                            data-style="py-0"
                                          >
                                            <option>Memebers</option>
                                            <option>Divesh Adivarekar</option>
                                            <option>Shashank Mahajan</option>
                                            <option>Prathamesh Navale</option>
                                            <option>Rudra Chintalwar</option>
                                          </select>
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
                                            value=""
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
                                        ${task.description}
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
                                            >${task.checklist.join(",")}</label
                                          >
                                        </div>
                                        <script>console.log("i am in checklist")
                                        </script>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="form-group mb-0">
                                  <label for="exampleInputText01" class="h5"
                                    >Attachments</label
                                  >
                                  <div class="custom-file">
                                    <input
                                      type="file"
                                      class="custom-file-input"
                                      id="inputGroupFile001"
                                    />
                                    <label
                                      class="custom-file-label"
                                      for="inputGroupFile001"
                                      >Upload media</label
                                    >
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

// to add task
function addTask() {
  const status = document.getElementById("status").value || "open";
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
