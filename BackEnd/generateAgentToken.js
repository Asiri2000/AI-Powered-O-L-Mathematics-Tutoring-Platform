const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { service: "agent-service" },
  "69f2ef15af16fdf21cae781707a5c935520e77ad94f2f608025c8745837fefd4",
  { expiresIn: "30d" }
);

console.log(token);
