const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/UserRoutes");
const checkUserRoutes = require("./routes/CheckUserRoutes");
const organisationsRoute = require("./routes/OrganisationRoutes");
const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.NODE_ENV === "test" ? 4000 : process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", userRoutes);
app.use("/api/users", checkUserRoutes);
app.use("/api/organisations", organisationsRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
}

module.exports = app;
