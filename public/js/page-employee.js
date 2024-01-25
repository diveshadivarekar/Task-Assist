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
            let profile;
            const randomWord = Math.random().toString(36).substring(2, 8);
            if (!fileData.profilePhoto) {
              // profile = "https://robohash.org/" + randomWord;
              profile = "https://robohash.org/" + fileData.name;
              // "https://cdn3d.iconscout.com/3d/premium/thumb/profile-9990712-8081897.png";
            } else {
              profile = fileData.profilePhoto;
            }
            const fileContent = `
          <div class="">
                <div
                  class="card-transparent card-block card-stretch card-height"
                >
                  <div class="card-body text-center p-0">
                    <div class="item">
                      <div class="odr-img">
                        <img
                          src="${profile}"
                          class="img-fluid rounded-circle avatar-90 m-auto"
                          alt="${fileData.name}"
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
                        <div class="container overflow-hidden text-center">
                        <div class ="row gx-5">
                        <div class="pt-3 border-top col">
                          <a href="https://api.whatsapp.com/send?phone=${fileData.phoneNumber}&text=hey,%20${fileData.name}!" target="_blank" class="btn btn-primary">Message</a>
                        </div>
                        <div class="pt-3 col">
                          <a href="#" class="btn btn-primary" onclick='deleteFile("${file.id}")'>Delete</a>
                        </div>
                        </div>
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

// add_employee.js
function addEmployee() {
  // const profilePhoto = document.getElementById("profilePhoto").value;
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  // const type = document.getElementById("type").value;
  // const role = document.getElementById("role").value;

  const employeeData = {
    // profilePhoto: profilePhoto,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    // type: type,
    // role: role,
  };

  // Send the employee data to the server
  fetch("/add-employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      // Redirect to the employee_data.html page
      window.location.href = "page-employee.html";
    })
    .catch((error) => console.error("Error adding employee:", error));
}
