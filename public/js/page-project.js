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
      let completecount = 0;
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
            map.forEach((count, key) => {
              console.log(`Element: ${key}, Count: ${count}`);
            });
            if (task.status === "completed") {
              console.log(task.taskName, task.project);
              completecount += 1;
            }
            if (map.get(task.project) > 1) {
              if (task.status === "completed") {
                console.log(task.taskName, task.project);
                completecount += 1;
              }
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
                      <div class="col-sm-8">
                      ${
                        false
                          ? `<div
                        class="d-flex align-items-center justify-content-between"
                      >
                      <progress class="iq-progress-bar"value="${
                        (map.get(task.project) / completecount) * 100
                      }" max="100"></progress>
                        
                        <span class="ml-3">${
                          (map.get(task.project) / completecount) * 100
                        }%</span>
                      </div>
                    </div>`
                          : ""
                      }
                  
                      
                      <h5 class="mb-1">${task.project}</h5>
                      <a href="#" class="btn bg-primary-light mr-3">${
                        task.project
                      }</a>
                    </div>
                  </div> 
                  `;
            taskDataList.appendChild(taskItem);
          }
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
      // if (Object.keys(map).length === 0) {
      //   taskDataList.innerHTML = "<p>No Project Found</p>";
      //   // console.log("no project found");
      // }
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
