function logInUser(e){
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let obj = {email, password};
    axios.post('http://localhost:3000/user/login',obj)
    .then((data)=>{
        console.log(data);
        if(data.data.message === 'new user created'){
            console.log(data.data.token);
            localStorage.setItem('tokenId', data.data.token);
            alert ('login successful');
        }
        else{
            alert ('wrong password');
        }
    })
    .catch(err=>{
        console.log(err);
        console.log(err.status);
        alert('user not present');
    });
}

document.getElementById('logInForm').addEventListener('submit',logInUser)