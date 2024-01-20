const express = require("express");

const homeRoute = require("./routes/homeRoute");
const todoRoute = require("./routes/todoRoute");
const authRoute = require("./routes/authRoute");

var app = express();
app.use(express.json());

app.use("/", homeRoute);
app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);

console.log(__dirname);
app.use("/api/pdf", express.static(__dirname + "/files/redux-book.pdf"));

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});
