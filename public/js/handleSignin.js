function handleSignin() {
  document
    .getElementById("signinButton")
    .addEventListener("click", async () => {
      // Redirect to the Google sign-in page
      // console.log("i was here ");
      window.location.href = "/auth/google";
    });
}
