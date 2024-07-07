const express = require("express");
const checkUser = require("../controllers/User");
const auth = require("../middlewares/AuthMiddleware");
const checkAuthHeader = require("../middlewares/CheckAuthHeaderMiddleware");

const router = express.Router();

router.get("/:id", checkAuthHeader, auth, checkUser);

module.exports = router;
