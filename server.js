const path = require("path");
const fs = require("fs/promises");
const express = require("express");

const Character = require("./models/Character");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const characters = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/main.html"));
});

app.post("/character", async (req, res) => {
  const data = req.body;
  const character = new Character(data.name, data.race, data.class);

  characters.push(character);

  await fs.writeFile("./db/characters.json", JSON.stringify(characters));

  res.json(character);
});

app.get("/api/characters", async (req, res) => {
  const characters = await fs.readFile("./db/characters.json", "utf-8");
  res.json(JSON.parse(characters));
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
