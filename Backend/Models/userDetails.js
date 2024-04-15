// const mongoose = require("mongoose");

// const UserDetailsScehma = new mongoose.Schema(
//   {
//     fname: String,
//     lname: String,
//     email: { type: String, unique: true },
//     password: String,
//     userType: String,
//   },
//   {
//     collection: "UserInfo",
//   }
// );

// mongoose.model("UserInfo", UserDetailsScehma);

const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    empId:String, 
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    userType: String, 
    dob: String,
    gender: String,
    phoneNo: String, 
    address: String
  },
  
);

mongoose.model("UserInfo", UserDetailsSchema);
