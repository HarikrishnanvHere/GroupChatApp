const User = require('../models/user');
const bcrypt = require('bcrypt');

const hashrounds = 10;

exports.postSignUpUser = async (req, res, next) =>{
    try{
        let {name, email, phone, password} = req.body;
        bcrypt.hash(password, hashrounds, async (err, hashedPassword)=>{
            await User.create({
                name: name,
                email: email,
                phone: phone,
                password: hashedPassword
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
