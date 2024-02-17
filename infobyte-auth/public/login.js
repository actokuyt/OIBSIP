const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  let payload = {
    username: loginUsername.value,
    password: loginPassword.value,
  };

  console.log(payload)

  try {
    let response = await axios.post("https://infobyte-auth.onrender.com/login", payload);
    console.log(response);
    if (response.status == 200) {
      loginUsername.value = "";
      loginPassword.value = "";
      // Swal.fire({
      //   text: "login Successful!",
      // });
      document.body.innerHTML = response.data;
    } else if(response.status == 404){
      Swal.fire({
        text: "Something Went Wrong",
      });
    }
  } catch (error) {
    console.error(error);
  }
});
