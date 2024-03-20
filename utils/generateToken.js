const jwt = require('jsonwebtoken');

const generateToken = (obj) =>{
     const {id , isAdmin} = obj ;
     let role = isAdmin ? 'admin' : 'user' ;
     const token = jwt.sign({userId : id , role : role} , process.env.JWT_SECRET ,{
        expiresIn : '30d' ,
     })
     console.log(token);
     return token ;
}

module.exports = generateToken ;