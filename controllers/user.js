const {v4 : uuidv4} = require('uuid');
const User = require('../models/user');
const {getUser, setUser} = require('../service/auth');

async function handelUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}

async function handelUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render('login', {
        err : "Invalid Username or Password"
    });

    // # using session id or statefull authentication
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie('uid', sessionId);

    // # using jwt(json web token) or stateless authentication
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect('/');
}

module.exports = {handelUserSignup, handelUserLogin};