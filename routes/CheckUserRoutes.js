const express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const checkUser = require("../controllers/User");

const router = express.Router();

router.get("/:id", auth, checkUser);

module.exports = router;
