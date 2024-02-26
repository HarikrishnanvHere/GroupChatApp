const tokenId = localStorage.getItem('tokenId');
console.log(tokenId);


function displayChat(info){

    let chatBox = document.getElementById('chat-box');
    let enterChatTextElement = document.createElement('p');
    enterChatTextElement.textContent = 'You joined';
    chatBox.appendChild(enterChatTextElement);
    
    if(info.data.users.length > 0){
        for (let i=0;i<info.data.users.length;i++){
            let usersOnlineTextElement = document.createElement('p');
            usersOnlineTextElement.textContent = `${info.data.users[i]} joined`;
            chatBox.appendChild(usersOnlineTextElement);
        }
    }
}

axios.get('http://localhost:3000/chat/getchat',{headers: {'authorization': tokenId}})
.then((info)=>{displayChat(info)})
.catch(err=>console.log(err));



function updateLoggedInInfo(){
    axios.get('http://localhost:3000/user/logout',{headers: {'authorization': tokenId}})
    .then((msg)=>{
        alert('successfully logged out');
        window.location.href = '../login/login.html';
        })
    .catch(err=>console.log(err))
}

document.getElementById('logOut').addEventListener('click',updateLoggedInInfo);



function sendMessage(){
    let message = document.getElementById('message').value;
    let obj = {message};
    axios.post('http://localhost:3000/chat/addchat',obj,
    {headers: {'authorization': tokenId}})
    .then((message)=>console.log(message))
    .catch((err)=>console.log(err))
}

document.getElementById('send').addEventListener('click', sendMessage);