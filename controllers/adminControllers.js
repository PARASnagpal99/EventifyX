const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const UserRegistration = require("../models/UserRegistration");
const UserInterest = require("../models/UserInterest");
const EventDetails = require("../models/EventDetails");
const moment = require('moment-timezone');


const axios = require("axios");


const adminSignup = asyncHandler(async (req, res) => {
    try {
      const { email, firstName, lastName, password , role} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const newUser = new User({
        email,
        firstName,
        lastName,
        password,
        role
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
  
      if (user && (await user.matchPassword(password)) && user.role === 'admin') {
        const userWithoutPassword = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role : user.role ,
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
  try{
    const { eventName , description , start , end , category_id , venue_id , currency , created_by , image_s3_key } = req.body;
    const headers = {
      Authorization: `Bearer ${process.env.TOKEN}`,
      'Content-Type': 'application/json', 
    };
    const payload = {
      event: {
        name: {
          html: `<p>${eventName}</p>`, 
        },
        description: {
          html: `<p>${description}</p>`, 
        },
        start : {
            timezone : start.timezone,
            utc : moment.tz(start.utc , 'utc').format()
        },
        end : {
            timezone : end.timezone,
            utc : moment.tz(end.utc , 'utc').format()
        },
        category_id,
        venue_id,
        currency,
      }
    };
     
     const URL = `https://www.eventbriteapi.com/v3/organizations/${process.env.ORG_ID}/events/`;
     const response = await axios.post(URL, payload, { headers }); 
     const event = response.data ;
     const event_id = event.id ;

     const eventDetails = new EventDetails({
       event_id,
       created_by,
       image_s3_key
     });

     await eventDetails.save();
     const responseBody = {...event , eventDetails};
     return res.status(200).send(responseBody);
  }catch(error){
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } 
});


module.exports = {
    adminSignup , 
    adminLogin , 
    createEvent
}