const dotenv = require("dotenv");
const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const checkUserRoutes = require("./routes/CheckUserRoutes");
const organisationsRoute = require("./routes/OrganisationRoutes");
const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use("/auth", userRoutes);
app.use("/api/users", checkUserRoutes);
app.use("/api/organisations", organisationsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = app;
