const dotenv = require("dotenv");
const express = require("express");
const auth = require("./middlewares/AuthMiddleware");
const userRoutes = require("./routes/UserRoutes");
const checkUserRoutes = require("./routes/CheckUserRoutes");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use("/auth", userRoutes);
app.use("/api/users", checkUserRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = app;
