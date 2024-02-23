function signUpNewUser(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;

    let obj = {name, email, phone, password};
    //console.log(obj);
    axios.post('http://localhost:3000/user/signup',obj)
        .then((user)=>{
            console.log(user);
            console.log('new user created');
            alert('new user created');
            window.location.href = '../login/login.html'
        })
        .catch((err)=>{
            console.log(err);
            alert('User Already Exists! please login!!')
        });

}

document.getElementById('signupForm').addEventListener('submit',signUpNewUser)