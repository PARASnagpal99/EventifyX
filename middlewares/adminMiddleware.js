const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler((req, res, next) => {
    if (req.user.role === 'admin') {
       next(); 
    } else {
       res.status(403).json({ message: 'Access forbidden: Admin privilege required' });
    }
});
  
module.exports = {isAdmin};