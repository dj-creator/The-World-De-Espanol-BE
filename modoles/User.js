const mongoose = require("mongoose");

const User = new mongoose.Schema({
  pfp: {type:String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  dob:{type: Date,required:true},
  country:{type:String,required:true},
});

module.exports = mongoose.model("User",User);
