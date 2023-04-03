const express = require("express");
const {
  registerUser,
  validateOtp,
  updateUser,
  Userlogin,
  getUser,
} = require("../Controller/user.controller");

const userRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           properties:
 *               firstName:
 *                   type: string
 *                   description: The user's first name
 *               lastName:
 *                   type: string
 *                   description: The user's last name
 *               phoneNo:
 *                   type: integer
 *                   description: The user's mobile number
 *               tempOtp:
 *                   type: integer
 *                   description: The user's OTP
 *               address1:
 *                   type: string
 *                   description: The user's address , e.g. street address
 *               address2:
 *                   type: string
 *                   description: The user's address, e.g. lane address
 *               pincode:
 *                   type: integer
 *                   description: The user's pincode
 *               city:
 *                   type: string
 *                   description: The user's city
 *               state:
 *                   type: string
 *                   description: The user's state
 *               role:
 *                   type: string
 *                   description: The user's role
 */

// All users

/**
 * @swagger
 * /users/:
 *   get:
 *      tags: [Users]
 *      summary: This will get all the user data from the database
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/User"
 */
userRouter.get("/", getUser);

// Registration

/**
 * @swagger
 * /users/register:
 *  post:
 *      tags: [Users]
 *      summary: Register a user
 *      description: This will register a new user to the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: OTP sent to mobile number
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: OTP sent to mobile number
 */

userRouter.post("/register", registerUser);

// Login

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags: [Users]
 *      summary: Login as a user
 *      description: This will Login a user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phoneNo:
 *                              type: integer
 *                              description: Registered mobile number
 *                          tempOtp:
 *                              type: integer
 *                              description: OTP send to mobile number
 *      responses:
 *          200:
 *              description: OTP sent to mobile number
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: OTP sent to mobile number
 */
userRouter.post("/login", Userlogin);

/**
 * @swagger
 * /users/validateOtp:
 *  post:
 *      tags: [Users]
 *      summary: Register a user
 *      description: This will Login a user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          tempOtp:
 *                              type: integer
 *                              description: OTP send to mobile number
 *      responses:
 *          200:
 *              description: User has been registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Login Successfull
 *                              token:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwNzdjZTM0YWUyYTMyYWU0NzU2NzciLCJpYXQiOjE2Nzk4NDk3Mjh9.i9kJY-UY4TZBza8Y4FKH7aypRH4m2eK0Je74pn"
 */

userRouter.post("/validateOtp", validateOtp);

// Registration

/**
 * @swagger
 * /users/update/:id:
 *  patch:
 *      tags: [Users]
 *      summary: Update User Details
 *      description: This will update user details in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: User details updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User details has been updated
 */
userRouter.patch("/updateUser/:id", updateUser);

module.exports = { userRouter };
