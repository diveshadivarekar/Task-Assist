// page-desk.js
document.addEventListener("DOMContentLoaded", () => {
  const open = document.getElementById("opendiv");
  const inprogress = document.getElementById("inprogressdiv");
  const completed = document.getElementById("completeddiv");

  let openCount = 0;
  let inProgressCount = 0;
  let completedCount = 0;

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
            taskItem.innerHTML = `
              <div class="card">
                              <div class="card-body">
                                <h5 class="mb-3">${task.taskName}</h5>
                                <p class="mb-3">
                                  <i class="las la-calendar-check mr-2"></i>${
                                    task.dueDate
                                  }
                                </p>
                                <div
                                  class="iq-progress-bar bg-secondary-light mb-4"
                                >
                                  <span
                                    class="bg-secondary iq-progress progress-1"
                                    data-percent="65"
                                    style="transition: width 2s ease 0s; width: 100%"
                                  ></span>
                                </div>
                                <div
                                  class="d-flex align-items-center justify-content-between"
                                >
                                  <div>
                                  <a href="#" class="btn btn-primary mr-3" onclick='deleteFile("${
                                    file.id
                                  }")'>Delete</a>
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
                                    
                                   
                                  
                                    </div>
                                   
                                </div>
                              </div>
                            </div>
                `;
            switch (task.status.toLowerCase()) {
              case "open":
                open.appendChild(taskItem);
                openCount++;
                break;
              case "in progress":
                inprogress.appendChild(taskItem);
                inProgressCount++;
                break;
              case "completed":
                completed.appendChild(taskItem);
                completedCount++;
                break;
              default:
                break;
            }
            // Update task counts
            document.getElementById("opencount").innerText = openCount;
            document.getElementById("inprogresscount").innerText =
              inProgressCount;
            document.getElementById("completedcount").innerText =
              completedCount;
          }
        } catch (error) {
          console.error("error fetching task data:", error);
        }
      }
    })
    .catch((error) => console.error("Error fetching task data:", error));
});
function deleteFile(fileId) {
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
  location.reload();
}
