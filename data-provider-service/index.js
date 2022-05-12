const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Home!" });
});

app.get("/user", async (req, res) => {
  try {
    const username = req.query.user;
    if (username === "all") {
      await db.User.getAllUser().then((result) => {
        res.status(200).json({ message: result });
      });
    } else {
      await db.User.getUser(username).then((result) => {
        res.status(200).json({ message: result });
      });
    }
  } catch (error) {
    res.status(404);
  }
});

app.post("/user", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (username != null && password != null) {
      db.User.createUser(username, password, role).then((incomplete) => {
        // console.log(incomplete);
        if (incomplete) {
          res.status(404).json({ message: incomplete });
        } else {
          res.status(201).json({ message: "Create Successfully" });
        }
      });
    } else {
      res.status(404).json({ message: "Username or Password is not invalid." });
    }
  } catch {
    res.status(404);
  }
});

app.listen(3001, () => {
  console.log("Application is running on port 80");
});
