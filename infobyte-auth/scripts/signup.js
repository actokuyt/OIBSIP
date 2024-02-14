import { registerUser } from "./users.js";

let signupUsername = document.getElementById("signupUsername");
let signupPassword = document.getElementById("signupPassword");
let signupSubmit = document.getElementById("signupSubmit");
signupSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser(signupUsername,signupPassword);

  signupUsername.value = "";
  signupPassword.value = "";
  Swal.fire({
    text: "Signup Successful!",
    footer: '<a href="./login.html">Login?</a>',
  });
});
