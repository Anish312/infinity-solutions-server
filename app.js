const express = require("express");
const app  = express(); 
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser")
var cors = require('cors')

// app.use(cors({
//     origin: "https://blue-website-3d4f8.web.app",  // Frontend URL
//     credentials: true                 // Allows cookies to be sent
//   }));

const allowedOrigins = ["https://blue-website-3d4f8.web.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
const product = require("./routes/productRoute")
const user  = require("./routes/userRoute")
const order  = require("./routes/orderRoute")
const categoryRoutes = require("./routes/categoryRoute");
app.use("/api/v1", categoryRoutes);
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
 
app.use(errorMiddleware)
module.exports =  app;