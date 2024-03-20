const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const UserRegistration = require("../models/UserRegistration");
const UserInterest = require("../models/UserInterest");


const adminSignup = asyncHandler(async (req, res) => {
    try {
      const { email, firstName, lastName, password , isAdmin} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const newUser = new User({
        email,
        firstName,
        lastName,
        password,
        isAdmin
      });
  
      const createdUser = await newUser.save();
  
  
      if (createdUser._id) {
        await UserInterest.create({ userId: createdUser._id, interests: [] });
        await UserRegistration.create({
          userId: createdUser._id,
          resregistrations: [],
        });
      }
      const userWithoutPassword = {
        userId: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        role : 'admin' ,
      };
      res
        .status(201)
        .json({
          user: userWithoutPassword
        });
    } catch (error) {
      console.error(error);
  
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(400).json({ error: "Duplicate key error" });
      }
      
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
const adminLogin = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email});
  
      if (user && (await user.matchPassword(password)) && user.isAdmin) {
        const userWithoutPassword = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role : 'admin' ,
        };
        const token = generateToken({id : user._id , isAdmin : user.isAdmin});
        res.status(200).json({ user: userWithoutPassword, auth: token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

const createEvent = asyncHandler(async(req,res) =>{
      
});


module.exports = {
    adminSignup , 
    adminLogin , 
    createEvent
}