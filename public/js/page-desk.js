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
                                  <i class="las la-calendar-check mr-2"></i>${task.dueDate}
                                </p>
                                <div
                                  class="iq-progress-bar bg-secondary-light mb-4"
                                >
                                  <span
                                    class="bg-secondary iq-progress progress-1"
                                    data-percent="65"
                                    style="transition: width 2s ease 0s; width: 65%"
                                  ></span>
                                </div>
                                <div
                                  class="d-flex align-items-center justify-content-between"
                                >
                                  <div class="iq-media-group">
                                    <a href="#" class="iq-media">
                                      <img
                                        src="../assets/images/user/01.jpg"
                                        class="img-fluid avatar-40 rounded-circle"
                                        alt=""
                                      />
                                    </a>
                                    <a href="#" class="iq-media">
                                      <img
                                        src="../assets/images/user/02.jpg"
                                        class="img-fluid avatar-40 rounded-circle"
                                        alt=""
                                      />
                                    </a>
                                    <a href="#" class="iq-media">
                                      <img
                                        src="../assets/images/user/03.jpg"
                                        class="img-fluid avatar-40 rounded-circle"
                                        alt=""
                                      />
                                    </a>
                                    <a href="#" class="iq-media">
                                      <img
                                        src="../assets/images/user/04.jpg"
                                        class="img-fluid avatar-40 rounded-circle"
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                  <div>
                                    <a href="#" class="btn bg-secondary-light"
                                      >${task.category}</a
                                    >
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
