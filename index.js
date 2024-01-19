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
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the requests
    optionsSuccessStatus: 204,
  };
app.use(cors(corsOptions));

// Routes 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/events',eventRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
