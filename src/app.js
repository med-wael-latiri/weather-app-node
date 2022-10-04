const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
//* define paths for express confif
const publicdirectory = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
//setup handlebars enfie and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);

//* setup static directory to serve
app.use(express.static(publicdirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "wael latiri",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about app",
    name: "wael latiri",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "help for app",
    title: "help page",
    name: "wael latiri",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "You must provide an adress  ",
    });
  }
  geocode(
    req.query.adress,
    (error, { lantitude, longitude, Nameplace } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lantitude, longitude, (error, forcastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forcast: forcastdata,
          location: Nameplace,
          adress: req.query.adress,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term ",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help page not found",
    name: "wael latiri",
  });
});
app.get("/*", (req, res) => {
  res.render("404", {
    title: "404 page not found",
    errorMessage: "error ",
    name: "wael latiri",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
