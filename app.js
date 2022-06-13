const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3500;
const db = require("./db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM counter where id = 1");
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/change", async (req, res) => {
  try {
    const response = await db.query(
      "UPDATE counter SET count = $1 WHERE id = 1 RETURNING *",
      [req.body.count]
    );
    res.end();
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
