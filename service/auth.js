// # StateFull authentication - for shorter session(period)
// const sessionIdToUserMap = new Map();
// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }


// # stateless authentication - for longer session(period)
const jwt = require('jsonwebtoken');
const secret = "Arun@123@";

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}
