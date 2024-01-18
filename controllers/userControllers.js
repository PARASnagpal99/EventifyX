const User = require('../models/User');

const signup = async(req,res)=>{
     try{
        const {firstName , lastName , email , password} = req.body ;
        const newUser = new User({
            firstName , 
            lastName , 
            email , 
            password 
        })
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
     }catch(err){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
     }
}

const login = async(req,res) => {
   try{
       const { email, password } = req.body;

       const user = await User.findOne({ email });

       if(user && user.password === password) {
         res.status(200).json({ message: 'Login successful', userId: user._id });
        }else {
         res.status(401).json({ error: 'Invalid credentials' });
        }
      }catch(error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
     }

}

module.exports = {
    signup ,
    login
}