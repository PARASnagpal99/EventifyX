// app.js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require('./config/db'); 
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes')
const adminRoutes = require('./routes/adminRoutes');
const s3Routes = require('./routes/awsS3Routes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const morgan = require('morgan');

connectDB();

const app = express();
app.use(cors());
app.use(morgan('tiny'));

// Middlewares 
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


// Routes 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/events',eventRoutes);
app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/awsS3',s3Routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
