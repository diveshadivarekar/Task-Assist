// add_employee.js
function addEmployee() {
  const profilePhoto = document.getElementById("profilePhoto").value;
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;
  const role = document.getElementById("role").value;

  const employeeData = {
    profilePhoto: profilePhoto,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    type: type,
    role: role,
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
      window.location.href = "employee_data.html";
    })
    .catch((error) => console.error("Error adding employee:", error));
}
