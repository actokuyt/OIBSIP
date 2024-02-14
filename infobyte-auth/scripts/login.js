import { loginUser } from "./users.js";

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  loginUser(loginUsername,loginPassword);

  loginUsername.value = "";
  loginPassword.value = "";

});