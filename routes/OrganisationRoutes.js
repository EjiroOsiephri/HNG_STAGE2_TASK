/**
 * @swagger
 * tags:
 *   name: Organisations
 *   description: Organisation management
 */

/**
 * @swagger
 * /api/organisations:
 *   get:
 *     summary: Get all organisations the user belongs to or created
 *     tags: [Organisations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     organisations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           orgId:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 */

/**
 * @swagger
 * /api/organisations/{orgId}:
 *   get:
 *     summary: Get a single organisation record
 *     tags: [Organisations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: Organisation ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orgId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 */

/**
 * @swagger
 * /api/organisations:
 *   post:
 *     summary: Create a new organisation
 *     tags: [Organisations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organisation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orgId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Client error
 */

/**
 * @swagger
 * /api/organisations/{orgId}/users:
 *   post:
 *     summary: Add a user to a particular organisation
 *     tags: [Organisations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *         required: true
 *         description: Organisation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to organisation successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Client error
 */

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
