const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupSubmit = document.getElementById("signupSubmit");
signupSubmit.addEventListener("click", async (e)=>{
  e.preventDefault();

  let payload = {
      username:signupUsername.value,
      password:signupPassword.value
  }

  try {
      const response = await axios.post("http://localhost:5000/signup", payload);
      console.log(response);
      if (response.status == 200){
          signupUsername.value = "";
          signupPassword.value = "";
          Swal.fire({
            text: "Signup Successful!",
            footer: '<a href="/">Login?</a>',
          });
      } else{
          Swal.fire({
              text: "Something Went Wrong",
            });
      }
  } catch (error) {
      console.error(error);
  }

});






// import { registerUser } from "./users.js";

// let signupUsername = document.getElementById("signupUsername");
// let signupPassword = document.getElementById("signupPassword");
// let signupSubmit = document.getElementById("signupSubmit");
// signupSubmit.addEventListener("click", (e) => {
//   e.preventDefault();
//   registerUser(signupUsername,signupPassword);

//   signupUsername.value = "";
//   signupPassword.value = "";
//   Swal.fire({
//     text: "Signup Successful!",
//     footer: '<a href="./login.html">Login?</a>',
//   });
// });
