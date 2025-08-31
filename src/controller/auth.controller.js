const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const {fullname:{firstname, lastname}, email, password} = req.body;

    const existingUser = await UserModel.findOne({email});
    if(existingUser) {
        return res.status(400).json({message: "User already exists"});
    }
     const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        fullname: {firstname, lastname},
        email,
        password: passwordHash
    });
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(201).json({message: 'user successfully registered', user})
}

async function login(req, res) {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"});
    }   

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(200).json({message: 'user successfully logged in', user})    
}


module.exports = {register,login};