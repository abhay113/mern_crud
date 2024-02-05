
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');


// let dburl = 'mongodb+srv://abhay:2002@thor.yecsrpv.mongodb.net/zomato?retryWrites=true&w=majority';
let dburl = 'mongodb://localhost:27017/zomato';

const app = express();
mongoose.Promise = global.Promise;


mongoose.connect(dburl).then(() => {
  console.log("database is connected ")
},
  err => {
    console.log("wrong something is  " + err);
  }
);


//use employeeRoutes
const empRoutes = require("./Routes/Employee.route");

//convert employee data to json
app.use(bodyParser.json());

//enable cors
app.use(cors());

const PORT = process.env.PORT || 3000;

//route confing
app.use("/employees",empRoutes);

// starting our server
const server = app.listen(PORT,()=>{
console.log("server is running on port : " + PORT);

});

