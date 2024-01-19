const User = require("../models/User");
const UserInterest = require("../models/UserInterest");
const UserRegistration = require("../models/UserRegistration");

const {
    InterestIdMappingInterest,
    InterestMappingInterestId,
  } = require("../utils/interest");

const signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Validate and save user to the database using your User model
    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
    });

    const createdUser = await newUser.save();

    console.log(createdUser);

    if (createdUser._id) {
      UserInterest.create({ userId: createdUser._id, interests: [] }),
        UserRegistration.create({
          userId: createdUser._id,
          resregistrations: [],
        });
    }

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful", userId: user._id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUserInterest = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { interest } = req.body;
  
      // console.log(InterestMappingInterestId);
      if (!InterestMappingInterestId.hasOwnProperty(interest)) {
          throw new Error("Interset no defined");
  
      } 
  
      const interestId = InterestMappingInterestId[interest];
      const user = await UserInterest.findOne({ userId });
      // console.log(user);
      user.interests.push(interestId);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error:", error.message);
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: error.message });
    }
  };

const registerUserForEvent = async (req, res) => {
    try{
        const userId = req.params.userId;
        const data = req.body;
        console.log(data);
        console.log(userId);

        const user = await UserRegistration.findOne({ userId: userId });
        console.log(user);
        user.events.push(data);
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

module.exports = {
  signup,
  login,
  addUserInterest,
  registerUserForEvent,
  deleteUser,
  userRegisteredEvents,
};
