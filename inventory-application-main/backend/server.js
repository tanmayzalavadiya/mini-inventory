const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

const errorHandler = require('./middleware/errorMiddleware');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(
    cors({
      origin: ["http://localhost:3000", "https://pinvent-app.vercel.app", "http://localhost:5173"],
      credentials: true,
    })
  );


//routes middleware
app.use('/api/users', userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);


//routes
app.get('/', (req, res) => {
    res.send('home page');
})
  
//error middleware
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/ims", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  }).then(y=>{
    console.log("connect")
})
.catch((error) => {
    console.log(error);
})

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
});