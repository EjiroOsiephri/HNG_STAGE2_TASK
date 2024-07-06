const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserOrganisation = async (req, res) => {
  try {
    const organisations = await prisma.organisation.findMany({
      where: {
        users: {
          some: {
            userId: req?.user?.userId,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Organisations retrieved successfully",
      data: {
        organisations,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Bad request",
      message: "Failed to retrieve organisations",
    });
  }
};

const getUserOrganisationById = async (req, res) => {
  const { orgId } = req.params;

  try {
    const organisation = await prisma.organisation.findUnique({
      where: { orgId },
    });

    if (!organisation) {
      return res.status(404).json({
        status: "Not Found",
        message: "Organisation not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Organisation retrieved successfully",
      data: organisation,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Bad request",
      message: "Failed to retrieve organisation",
    });
  }
};

const createUserOrganisation = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(422).json({
      errors: [{ field: "name", message: "Name is required" }],
    });
  }

  try {
    // Ensure req.user.userId is defined (assuming it's set by your authentication middleware)
    if (!req.user) {
      console.log(req.user);
      return res.status(401).json({
        status: "Unauthorized",
        message: "User not authenticated or session expired",
      });
    }

    const user = await prisma.user.findUnique({
      where: { userId: req.user },
    });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found",
      });
    }

    const organisation = await prisma.organisation.create({
      data: {
        name,
        description,
        users: {
          create: {
            userId: req.user,
          },
        },
      },
    });

    res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: organisation,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Bad request",
      message: "Failed to create organisation",
    });
  }
};
const addUserToAParticularOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { userId } = req.body;

  try {
    const existingRecord = await prisma.organisationsOnUsers.findUnique({
      where: {
        userId_organisationId: {
          userId,
          organisationId: orgId,
        },
      },
    });

    if (existingRecord) {
      return res.status(409).json({
        status: "Conflict",
        message: "User is already part of this organisation",
      });
    }

    await prisma.organisationsOnUsers.create({
      data: {
        userId,
        organisationId: orgId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Bad request",
      message: "Failed to add user to organisation",
    });
  }
};

module.exports = {
  getAllUserOrganisation,
  getUserOrganisationById,
  createUserOrganisation,
  addUserToAParticularOrgainisation: addUserToAParticularOrganisation,
};
