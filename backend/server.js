require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connectDB.js");
const userRoute = require("./routes/userRoute.js");
const errorHandler = require("./middleWare/errorMiddleware.js");

const app = express();

connectDB();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Route Middlewares
app.use("/api/users", userRoute);

//Routes
 app.get("/", (req,res) => {
     res.send("Home Page");
     
});

//Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




