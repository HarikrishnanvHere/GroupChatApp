const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashrounds = 10;

exports.postSignUpUser = async (req, res, next) =>{
    try{
        let {name, email, phone, password} = req.body;
        bcrypt.hash(password, hashrounds, async (err, hashedPassword)=>{
            await User.create({
                name: name,
                email: email,
                phone: phone,
                password: hashedPassword,
                loggedIn: false
            })
            .then(user => res.status(201).json({user: user, message: 'new user created'}))
            .catch(err=> {
                console.log(err);
                res.status(400).json({message: 'Duplicate entries. Info already present!'})
        })

        })
        
       
        
    }
    catch{(
        (err)=>{
            console.log(err);
            res.status(400).json({message: 'failed to create new user'})
        }
        
    )}
}

function generateToken (id) {
    let key = jwt.sign({userId: id}, process.env.JWT_SECRET_KEY);
    return key;
}

exports.postLoginUser = async (req, res, next) =>{
    try{
        console.log("Hit success");
        let {email, password} = req.body;
        let user = await User.findOne({where: {email : email}});
        //console.log(user);
        if(!user){
            return res.status(400).json({message: 'user not present'});
        }
        bcrypt.compare(password, user.password, async (err, result) =>{
            if(result === false){
                return res.status(200).json({message: 'wrong password'});
            }
            else if(result === true){
                await user.update({loggedIn: true});
                return res.status(200).json({token: generateToken(user.id), message: 'login successful'})
            }
        })

    }
    catch{
        (err)=>{
            console.log(err);
            res.status(400).json({message: 'something went wrong'});
        }
    }
}


exports.getLogOutUser = async (req, res, next) =>{
    try{
        await req.user.update({loggedIn: false});
        return res.status(200).json({message: 'logout successful'});
    }
    catch {
        (err) => console.log(err);
        res.status(400).json({message: 'loggedIn status falied'});
    }
}