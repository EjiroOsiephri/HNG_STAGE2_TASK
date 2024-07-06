const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
    });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad request",
      message: "Failed to retrieve user",
    });
  }
};

module.exports = checkUser;
