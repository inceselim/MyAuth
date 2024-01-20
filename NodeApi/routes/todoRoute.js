const courseRoute = require("express").Router();

courseRoute.get("/", (req, res) => {
  res.send("GET request to the courses");
});

courseRoute.get("/:id", (req, res) => {
  res.send(req.params);
});

courseRoute.get("/:year/:month", (req, res) => {
  res.send(req.params);
});

module.exports = courseRoute;
