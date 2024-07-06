const express = require("express");
const registerUserController = require("../controllers/RegisterUserController");
const loginUserController = require("../controllers/LoginUserController");

const Router = express.Router();

Router.post("/register", registerUserController);
Router.post("/login", loginUserController);

module.exports = Router;
