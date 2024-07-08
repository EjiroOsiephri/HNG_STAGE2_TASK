const express = require("express");
const {
  getAllUserOrganisation,
  getUserOrganisationById,
  createUserOrganisation,
  addUserToAParticularOrgainisation,
} = require("../controllers/OrganisationController");

const auth = require("../middlewares/AuthMiddleware");
const checkAuthHeader = require("../middlewares/CheckAuthHeaderMiddleware");

const Router = express.Router();

Router.get("/", checkAuthHeader, auth, getAllUserOrganisation);
Router.get("/:orgId", checkAuthHeader, auth, getUserOrganisationById);
Router.post("/", checkAuthHeader, auth, createUserOrganisation);
Router.post(
  "/:orgId/users",
  checkAuthHeader,
  auth,
  addUserToAParticularOrgainisation
);

module.exports = Router;
