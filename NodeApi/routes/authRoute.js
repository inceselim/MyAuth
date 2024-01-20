const authRoute = require("express").Router();
const Promise = require("bluebird");
const AppData = require("../data/appData");
const UserRepository = require("../data/userRepository");

const appData = new AppData("./data/todoDb.sqlite3");
const userRepo = new UserRepository(appData);

authRoute.post("/login", async (req, res) => {
  console.log("login", req.body);
  const { username, password } = req.body;
  const { authorization } = req.headers;
  userRepo.createTable();

  setTimeout(async () => {
    var user = await userRepo.getByUsername(username);
    console.log(user);
    if (user && user.password == password) {
      res.send({ username, password, token: `${username},${password}` });
    } else {
      res.status(400).json({
        message: "Kullanıcı girişi hatası...",
      });
      res.end();
    }
  }, 3000);
});

authRoute.post("/isUserValid", (req, res) => {
  console.log("isUserValid", req.body);
  const { username, password } = req.body;
  const { authorization } = req.headers;
  userRepo.createTable();

  setTimeout(async () => {
    var user = await userRepo.getByUsername(username);
    console.log(user);
    if (user && user.password == password) {
      res.send({ username, password, token: `${username},${password}` });
    } else {
      res.status(400).json({
        message: "Kullanıcı girişi hatası...",
      });
      res.end();
    }
  }, 3000);
});

authRoute.get("/logout", (req, res) => {
  console.log("logout", req.body);
  setTimeout(() => {
    res.status(200).json({
      username: "",
      token: "",
      valid: "",
    });
    res.end();
  }, 3000);
});

authRoute.post("/register", async (req, res) => {
  console.log("register", req.body);
  const { username, password, email } = req.body;
  const { authorization } = req.headers;
  userRepo.createTable();

  var user = await userRepo.getByUsername(username);
  if (user) {
    res.status(400).send("Kullanıcı adı kayıtlı...");
    return;
  }

  var user = await userRepo.getByEmail(email);
  if (user) {
    res.status(400).json({
      message: "EMail adresi kayıtlı...",
    });
    res.end();
    return;
  }

  setTimeout(() => {
    userRepo.createTable().then(async () => {
      userRepo
        .createTable()
        .then(() => userRepo.create(username, password, email));
      res.send({ username, email, password });
    });
  }, 3000);
});

module.exports = authRoute;
