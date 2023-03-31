const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNo: Number,
    tempOtp: Number,
    address1: String,
    address2: String,
    pincode: Number,
    city: String,
    state: String,
    role: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
