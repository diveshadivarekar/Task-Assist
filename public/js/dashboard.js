document.addEventListener("DOMContentLoaded", async () => {
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
          <h5 class="mb-1"><a href="${event.htmlLink}" class="event-link">${
          event.summary
        }</a></h5>
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

// {
//   <div class="card card-list">
//     <div class="card-body">
//       <div class="d-flex align-items-center">
//         <svg
//           class="svg-icon text-secondary mr-3"
//           width="24"
//           height="24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         >
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//         </svg>
//         <div class="pl-3 border-left">
//           <h5 class="mb-1">Direct Development</h5>
//           <p class="mb-0">Unveling the design system</p>
//         </div>
//       </div>
//     </div>
//   </div>;
// }
