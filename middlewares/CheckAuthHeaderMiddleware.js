const checkAuthHeader = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({
      error: [
        {
          field: "Authorization",
          message: "No token found, autorization denied",
        },
      ],
    });
  }
  next();
};

module.exports = checkAuthHeader;
