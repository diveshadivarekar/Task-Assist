// view_employee.js
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
          console.log(fileData);
          const fileContent = `
          <img src="${fileData.profilePhoto}" alt="Profile Photo" style="width: 100px; height: 100px;"><br>
          id: ${fileData.id}, 
          <strong>Name:</strong> ${fileData.name}<br>
          <strong>Phone Number:</strong> ${fileData.phoneNumber}<br>
          <strong>Email:</strong> ${fileData.email}<br>
          <strong>Type:</strong> ${fileData.type}<br>
          <strong>Role:</strong> ${fileData.role}<br>
          <hr>  
          `;

          const listItem = document.createElement("li");
          // document.getElementById("data")
          listItem.innerHTML += `${fileContent} \n`;
          // console.log(fileContent);
          employeeDataList.appendChild(listItem);
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
    })
    .catch((error) => console.error("Error fetching employee data:", error));
});
