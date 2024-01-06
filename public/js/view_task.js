// view_task.js
document.addEventListener("DOMContentLoaded", async () => {
  const taskDataList = document.getElementById("taskDataList");

  // Fetch task data from tasks.json
  const response = await fetch("/task-data")
    .then((response) => response.json())
    .then(async (data) => {
      let count = 0;
      for (const file of data) {
        if (file.name !== "tasks.json") {
          continue;
        }
        count++;
        try {
          const fileId = file.id;
          const response = await fetch(`/task-data/${fileId}`);
          const fileData = await response.json();

          document.getElementById("taskcount").innerHTML = `Task #${count}`;
          const fileContent = `id: ${file.id}, 
          file name: ${file.name}, 
          content: ${fileData || "File content not found."}
          status: ${fileData.status}
          Task Name: ${fileData.taskName}
          Assigned To: ${fileData.assignedTo}
          Due Date: ${fileData.dueDate}
          Category: ${fileData.category}
          Description: ${fileData.description}
          Checklist: ${fileData.checklist.join(", ")}
          Attachments: ${fileData.attachments.join(", ")}
          `;

          const listItem = document.createElement("li");
          // document.getElementById("data")
          listItem.innerText += `${fileContent} \n`;
          // console.log(fileContent);
          taskDataList.appendChild(listItem);
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
    })
    .catch((error) => console.error("Error fetching task data:", error));
});
