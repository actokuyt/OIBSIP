var bcrypt = dcodeIO.bcrypt;

let users = [];

function registerUser(username, password) {
    let hashedPassword = bcrypt.hashSync(`${signupPassword.value}`, 10);
  
    let user = {
      username: username,
      password: password,
    };
    
    users.push(user);
    console.log(users)
}

function loginUser(username,password){
    console.log (users);
    users.forEach((user)=>{
        if (username == loginUsername){
            if (bcrypt.compare(password, user.password )) {
                Swal.fire({
                    text: "login Successful!",
                  });
            }else{
                Swal.fire({
                    text: "login Failed!",
                  });
            }
        }
    })
}


export {registerUser, loginUser};