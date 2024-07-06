const dotenv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = app;
