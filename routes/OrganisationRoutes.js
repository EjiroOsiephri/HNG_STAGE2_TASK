const express = require("express");
const {
  getAllUserOrganisation,
  getUserOrganisationById,
  createUserOrganisation,
  addUserToAParticularOrgainisation,
} = require("../controllers/OrganisationController");

const auth = require("../middlewares/AuthMiddleware");

const Router = express.Router();

Router.get("/", auth, getAllUserOrganisation);
Router.get("/:orgId", auth, getUserOrganisationById);
Router.post("/", auth, createUserOrganisation);
Router.post("/:orgId/users", auth, addUserToAParticularOrgainisation);

module.exports = Router;
