const homeRoute = require("express").Router();

homeRoute.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

module.exports = homeRoute;
