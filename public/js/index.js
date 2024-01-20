document.addEventListener("DOMContentLoaded", async () => {
  try {
    try {
      const response = await fetch("/signinStatus");
      if (response.ok) {
        const data = await response.json();
        if (!data.status) {
          window.location.href = "/backend/auth-sign-in.html";
        }
      } else {
        console.error("Failed to fetch signinStatus:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    const response = await fetch("/getUserProfile");
    const data = await response.json();

    const parentProfile = document.getElementById("profile");

    const profileLink = document.createElement("a");
    profileLink.href = "#";
    profileLink.classList.add(
      "search-toggle",
      "dropdown-toggle",
      "d-flex",
      "align-items-center"
    );
    profileLink.id = "dropdownMenuButton4";
    profileLink.setAttribute("data-toggle", "dropdown");
    profileLink.setAttribute("aria-haspopup", "true");
    profileLink.setAttribute("aria-expanded", "false");

    const profileImage = document.createElement("img");
    profileImage.src = data.photoUrl; // Use the dynamic photo URL from the server
    profileImage.classList.add("img-fluid", "rounded-circle");
    profileImage.alt = "user";

    const profileCaption = document.createElement("div");
    profileCaption.classList.add("caption", "ml-3");

    const profileName = document.createElement("h6");
    profileName.classList.add("mb-0", "line-height");
    profileName.innerHTML = `${data.name}<i class="las la-angle-down ml-2"></i>`;

    // Append child elements to parent elements
    profileCaption.appendChild(profileName);
    profileLink.appendChild(profileImage);
    profileLink.appendChild(profileCaption);
    parentProfile.appendChild(profileLink);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});
