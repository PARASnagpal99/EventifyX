const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler((req, res, next) => {
   const userRole = req.headers['x-user-role'];
   if (userRole && userRole === 'admin') {
       next();
   } else {
       res.status(403).json({ message: 'Access forbidden: Admin privilege required' });
   }

});
  
module.exports = {isAdmin};