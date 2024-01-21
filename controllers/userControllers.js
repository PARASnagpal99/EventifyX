const User = require("../models/User") ;
const UserInterest = require("../models/UserInterest") ;
const UserRegistration = require("../models/UserRegistration") ;
const Event = require('../models/Event'); 
const EventRegistration = require('../models/EventRegistration'); 
const sendMail = require('../utils/sendEmail') ;
const generateToken = require('../utils/generateToken') ;
const asyncHandler = require('express-async-handler') ;

const {
    InterestIdMappingInterest,
    InterestMappingInterestId,
  } = require("../utils/interest");

 const signup = asyncHandler(async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body;
  
      // Validate email uniqueness
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Validate other fields if needed
  
      // Create a new user
      const newUser = new User({
        email,
        firstName,
        lastName,
        password,
      });
  
      // Save the user to the database
      const createdUser = await newUser.save();
  
      ///console.log(createdUser);
  
      if (createdUser._id) {
        // Create associated records
        await UserInterest.create({ userId: createdUser._id, interests: [] });
        await UserRegistration.create({ userId: createdUser._id, resregistrations: [] });
      }
      const userWithoutPassword = {
        userId: createdUser._id,
        firstName : createdUser.firstName ,
        lastName : createdUser.lastName,
        email: createdUser.email,
      };
      res.status(201).json({user : userWithoutPassword , token : generateToken(createdUser._id)});

    } catch (error) {
      console.error(error);
  
      // Check for Mongoose validation error (e.g., duplicate key error)
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(400).json({ error: "Duplicate key error" });
      }
  
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
      const userWithoutPassword = {
        userId: user._id,
        firstName : user.firstName ,
        lastName : user.lastName,
        email: user.email,
      };
      const token = generateToken(user._id);
     // console.log(user._id)
      res
      .status(200)
      .json({ user:userWithoutPassword , auth: token});
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const addUserInterest = async (req, res) => {
  try {
    const userId = req.params.userId ;
    const { interest } = req.body ;

    if (!InterestMappingInterestId.hasOwnProperty(interest)) {
        throw new Error("Interest no defined");
    } 
    const interestId = InterestMappingInterestId[interest];
    const user = await UserInterest.findOne({ userId });

    if(user.interests.includes(interestId)){
      console.log("Interest")
      res.status(202).json({message:"Interest Alerady Exists"});
    }else{
      user.interests.push(interestId);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (error) {
      console.error("Error:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
  }
};

const removeUserInterest = async (req, res) => {
  console.log(req.body);
  try{
    const userId = req.params.userId ;
    const { interest } = req.body ;
    console.log(userId);
    const user = await UserInterest.findOne({userId});
    const interestId = InterestMappingInterestId[interest];

    if(!user.interests.includes(interestId)){
      res.status(500).json({error:"No Interest found"});
    }else{
      user.interests = user.interests.filter(id => id !== interestId);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  }catch(error){
    console.error("Error:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
  }
};

const registerUserForEvent = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    console.log(data);
    console.log(userId);

    const user = await UserRegistration.findOne({ userId: userId });
    const {email} = await User.findOne({ _id : userId });
    console.log(email);
    console.log(user);
    user.events.push(data);
    const updatedUser = await user.save();
    await sendMail(email,data);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const unregisterUserForEvent = async (req, res) => {
  try{
    const userId = req.params.userId;
    const event_id  = req.body;  // _id of the event store in the userRegistration events collection.
    console.log(data);
    console.log(event_id);

    const user = await UserRegistration.findOne({ userId: userId });
    console.log(user);
    user.events = user.events.filter(event => event._id!== event_id);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  }catch (error) {
    console.error("Error:", error.message);
    return res
    .status(500)
    .json({ error: "Internal Server Error", details: error.message });
  }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOneAndDelete({ _id: userId });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error:", error.message);
        return res
         .status(500)
         .json({ error: "Internal Server Error", details: error.message });
    }
};

const userRegisteredEvents = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserRegistration.findOne({ userId: userId });
        res.status(200).json(user.events);
    } catch (error) {
        console.error("Error:", error.message);
        return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
};


const getUserInterests = async (req, res) => {
  try{
    const userId = req.params.userId;
    const user = await UserInterest.findOne({ userId: userId });
    const userInterest = [];
    for (const interest of user.interests) {
      userInterest.push(InterestIdMappingInterest[interest]);
    }

    res.status(200).json(userInterest);
  }catch(error){
    console.error("Error:", error.message);
    return res
    .status(500)
    .json({ error: "Internal Server Error", details: error.message });
  }
};


const changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: userId });
    if (user.password === oldPassword) {
      user.password = "";
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res
    .status(500)
    .json({ error: "Internal Server Error", details: error.message });
  }
}

const getUsersRegisteredForAnEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    const isValidEventId = await Event.findById(eventId).exec();

    if (!isValidEventId) {
      return res.status(400).json({ error: "Event not found" });
    }
 
    const registrations = await EventRegistration.find({ eventId: eventId })
      .populate('userId', 'firstName lastName'); // Populate user details

    return res.status(200).json(registrations);
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid eventId format" });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    const isValidUserId = await User.findById(userId).exec();

    if (!isValidUserId) {
      return res.status(400).json({ error: "Invalid userId format or user not found" });
    }

    const user = await User.findById(userId)
      .populate('friends.userId', 'firstName lastName'); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friends = user.friends;

    return res.status(200).json({ friends });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });

  }
};

module.exports = {
  signup,
  login,
  addUserInterest,
  registerUserForEvent,
  deleteUser,
  userRegisteredEvents,
  getUserInterests,
  removeUserInterest,
  unregisterUserForEvent,
  getUsersRegisteredForAnEvent,
  getUserFriends
};