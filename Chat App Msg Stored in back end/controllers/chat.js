const User = require('../models/user');
const Chat = require('../models/chat');

exports.getChat = async (req, res, next) =>{
    try {
        const users = await User.findAll({attributes: ['name'], where: {loggedIn: 1}});
        let currentUser = req.user.name;
        let usersOnline = [];
        for(let i=0; i<users.length; i++){
            if(users[i].name != req.user.name){
                usersOnline.push(users[i].name);
            }
        }
        return res.status(200).json({users: usersOnline, currentUser: currentUser, message: 'list of users online'})
    }
    catch {
        (err) => res.status(400).json({message : 'something went wrong'});
    }
}


exports.postAddChat = async (req, res, next) =>{
    try{
        console.log("HIT SUCCESS");
        let currentUser = req.user.name;
        let message = await req.user.createChat({
            message: req.body.message
        })
        res.status(201).json({display: message, data: 'msg added successfully'});

    }
    catch{
        (err) =>{
            console.log(err);
            res.status(400).json({data: 'something went wrong'});
        }
    }
}