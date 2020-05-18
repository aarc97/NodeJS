const express = require("express");
const app = express();

const hbs = require("hbs");
require("./hbs/helpers");
// Express HBS engine
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home", { name: "andris" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => console.log("Escuchando puerto 3000"));
