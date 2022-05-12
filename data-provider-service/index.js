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

app.post("/electrical", async (req, res) => {
  console.log(req.body);
  try {
    const electrical_data = req.body;
    await db.Electrical.createElacticDataRow(electrical_data);
    res.status(200).json({ message: "Add data in row Successfully" });
  } catch (error) {
    res.status(400);
  }
});

app.get("/electrical", async (req, res) => {
  const option = req.query;
  const { count, rows } = await db.Electrical.getLastdataHistory(option);
  console.log(count);
  res.status(200).json({
    count: count,
    data: rows,
  });
});

app.listen(3001, () => {
  console.log("Application is running on port 80");
});
