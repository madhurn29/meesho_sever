const express = require("express");
const {
  registerUser,
  validateOtp,
  updateUser,
  Userlogin,
  getUser,
} = require("../Controller/user.controller");
const userRouter = express.Router();
userRouter.get("/", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", Userlogin);
userRouter.post("/validateOtp", validateOtp);
userRouter.patch("/updateUser/:id", updateUser);

module.exports = { userRouter };
