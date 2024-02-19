document.addEventListener("DOMContentLoaded", async () => {
  const taskDataList = document.getElementById("taskdiv");
  let project = [];
  const colors = ["warning", "secondary", "primary"];
  const fetchData = async () => {
    try {
      const response = await fetch("/task-data");
      const data = await response.json();

      let taskcount = 0;
      let completed = 0;
      let empcount = 0;
      let count = 0;
      let projectCount = 0;
      let map = new Map();

      const promises = data.map(async (file) => {
        if (file.name === "tasks.json") {
          taskcount += 1;
          const fileId = file.id;
          try {
            const response = await fetch(`/task-data/${fileId}`);
            const task = await response.json();

            if (task.status === "completed") {
              completed += 1;
            }

            if (
              projectCount < 3 &&
              task.project &&
              !project.includes(task.project)
            ) {
              project.push(task.project);

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
              let color = colors[projectCount];
              const projectItem = document.createElement("li");
              projectItem.className = "mb-1";
              projectItem.style.textAlign = "center";
              projectItem.style.paddingBottom = "1.5rem";
              const ranval = Math.floor(Math.random() * 100) + 1;
              projectItem.innerHTML = `
              <div class="row">
                <div class="col-sm-3 d-flex align-items-center">
                  <svg
                    class="svg-icon"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path
                      d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                    ></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <p
                    id="proj1"
                    style="margin-left: 20px"
                    class="mb-0"
                  >${task.project}</p>
                </div>
                <div class="col-sm-8">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                  <progress class="iq-progress-bar"value="${ranval}" max="100"></progress>
                    
                    <span class="ml-3">${ranval}%</span>
                  </div>
                </div>
              </div>
                  `;
              document.getElementById("projlist").appendChild(projectItem);

              projectCount += 1;
            }

            if (count - empcount < 4) {
              const taskItem = document.createElement("div");
              taskItem.className = "col-lg-12";
              taskItem.innerHTML = `
              <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="row align-items-center">
                        <div class="col-md-2">
                        <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                        </div>
                        <div class="col-md-9">
                          <div class="mt-3 mt-md-0">
                            <h5 class="mb-1">${task.taskName}</h5>
                            <p class="mb-0">
                              ${task.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4 text-sm-right mt-3 mt-sm-0">
                    ${
                      task.project
                        ? `<a href="#" class="btn btn-white text-primary link-shadow mt-2">${task.project}</a>`
                        : ""
                    }
                    
                      ${
                        task.category
                          ? `<a href="#" class="btn btn-white text-secondary link-shadow mt-2">${task.category}</a>`
                          : ""
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
              taskDataList.appendChild(taskItem);
            }
          } catch (error) {
            console.error("Error fetching task:", error);
          }
        } else if (file.name === "employee.json") {
          empcount += 1;
        }
        count += 1;
      });

      // Execute all promises concurrently
      await Promise.all(promises);

      document.getElementById("taskcount").innerText = taskcount;
      document.getElementById("completedTask").innerText = completed;
      document.getElementById("inprogress").innerText = taskcount - completed;
      document.getElementById("empcount").innerText = empcount;

      // console.log("total task " + taskcount + " tasks");
      // console.log("completed task " + completed + " completed tasks");
      // console.log("In progress task " + (taskcount - completed) + " tasks");
      // console.log("total employee " + empcount + " employees");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  // Make the API call to fetch events
  const response = await fetch("/google/calendar");
  const data = await response.json();
  const events = data.events;

  // Get the container element to append events
  const eventsContainer = document.getElementById("events-container");

  // Check if there are events to display
  if (events && events.length > 0) {
    // Loop through each event and create HTML content
    const eventsHTML = events
      .slice(0, 4) // Get only the first 4 events
      .map((event) => {
        const startDate = new Date(event.start.date);
        const endDate = new Date(event.end.date);
        const dateFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        return `
        <div class="card card-list">
    <div class="card-body">
      <div class="d-flex align-items-center">
      <svg
      class="svg-icon text-primary mr-3"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline
        points="22 12 16 12 14 15 10 15 8 12 2 12"
      ></polyline>
      <path
        d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      ></path>
    </svg>
        <div class="pl-3 border-left">
          <h5 class="mb-1"><a href="${
            event.htmlLink
          }" class="event-link" target="_blank">${event.summary}</a></h5>
          <p class="mb-0">Date: ${startDate.toLocaleDateString(
            "en-US",
            dateFormatOptions
          )} - ${endDate.toLocaleDateString("en-US", dateFormatOptions)}</p>
        </div>
      </div>
    </div>
  </div>
  `;
      })
      .join("");

    // Set the innerHTML of eventsContainer
    eventsContainer.innerHTML = eventsHTML;
  } else {
    // Display a message if there are no events
    eventsContainer.textContent = "No events available.";
  }
});
