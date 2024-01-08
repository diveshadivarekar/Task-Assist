// view_employee code
document.addEventListener("DOMContentLoaded", () => {
  const employeeDataList = document.getElementById("employeeDataList");

  // Fetch employee data from employee.json
  fetch("/employee-data")
    .then((response) => response.json())
    .then(async (data) => {
      for (const file of data) {
        if (file.name !== "employee.json") {
          continue;
        }
        try {
          const fileId = file.id;
          const response = await fetch(`/employee-data/${fileId}`);
          const fileData = await response.json();
          if (data.length === 0) {
            taskDataList.innerHTML = "<p>No task data available.</p>";
          } else {
            const listItem = document.createElement("div");
            listItem.className = "col-lg-4";
            // listItem.classList.add("col-md-6", "col-lg-4");
            const fileContent = `
          
          <div class="">
                <div
                  class="card-transparent card-block card-stretch card-height"
                >
                  <div class="card-body text-center p-0">
                    <div class="item">
                      <div class="odr-img">
                        <img
                          src="${fileData.profilePhoto}"
                          class="img-fluid rounded-circle avatar-90 m-auto"
                          alt="image"
                        />
                      </div>
                      <div class="odr-content rounded">
                        <h4 class="mb-2">${fileData.name}</h4>
                        <p class="mb-3">${fileData.email}</p>
                        <ul class="list-unstyled mb-3">

                        <a href="mailto:${fileData.email}" target="_blank">
                          <li
                            class="bg-secondary-light rounded-circle iq-card-icon-small mr-4"
                          >
                            <i class="ri-mail-open-line m-0"></i>
                          </li>
                        </a>

                        <a href="https://api.whatsapp.com/send?phone=${fileData.phoneNumber}&text=hey,%20${fileData.name}!" target ="_blank"> 
                          <li
                            class="bg-primary-light rounded-circle iq-card-icon-small mr-4"
                          >
                          <i class="ri-chat-3-line m-0"></i>
                          </li>  
                        </a>

                        <a href="tel://${fileData.phoneNumber}">
                          <li
                            class="bg-success-light rounded-circle iq-card-icon-small"
                          >
                            <i class="ri-phone-line m-0"></i>
                          </li>
                        </a>

                        </ul>
                        <div class="pt-3 border-top">
                          <a href="#" class="btn btn-primary">Message</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


          `;
            listItem.innerHTML += fileContent;
            employeeDataList.appendChild(listItem);
          }
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
    })
    .catch((error) => console.error("Error fetching employee data:", error));
});
