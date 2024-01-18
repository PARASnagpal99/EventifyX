// app.js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes')

connectDB();

const app = express();

// Middlewares 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/events',eventRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
