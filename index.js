const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser= require("body-parser");
// const colors = require("colors");
const dotenv = require("dotenv");
const Connection = require("./config/db");
//routes jo bnaye hai le aao unhe
const authRoutes = require('./routes/authRoutes');
const errorHandler = require("./middlewares/errorMiddleware");


//dotenv
dotenv.config();

const username = process.env.DP_USERNAME;
const password = process.env.DP_PASSWORD;

//mongo coonection
Connection(username,password);

//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(errorHandler)

const PORT=process.env.PORT || 8080;

//API routes
app.use('/api/v1/auth',authRoutes)


app.listen(PORT,() => {
  console.log(`sever running -> ${process.env.DEV_MODE } on ${PORT}`);
});