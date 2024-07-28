const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const swaggerDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HNG Stage 2 Task API",
      version: "1.0.0",
      description: "API documentation for HNG Stage 2 Task",
    },
    servers: [
      {
        url: `https://hngstage2task-production.up.railway.app`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const doc = swaggerDocs(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(doc));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
}

module.exports = app;
