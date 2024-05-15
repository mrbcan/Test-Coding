  require('dotenv').config();
const express = require("express");
const customerRouter=require("./routes/customers");
const orderRouter=require("./routes/orders");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const compression = require("compression");



const app = express();
const port = 3100;




app.use(cors());
app.options("*", cors());


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);



//cookie parser, req.cookies
app.use(cookieParser());

// compression middleware.
app.use(compression());



app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });

 
  app.use("/api/orders", orderRouter);
  app.use("/api/customers", customerRouter);



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });


  //display this path on all unknown paths!!
app.all("*", (req, res, next) => {
  next(new AppError(`Bu sunucuda ${req.originalUrl} bulunamadı!`, 404));
});


app.use(globalErrorHandler);
  module.exports = app;

 