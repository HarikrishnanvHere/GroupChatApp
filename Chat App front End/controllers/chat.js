const User = require('../models/user');

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