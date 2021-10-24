const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const forekast = require("./utils/forecast");
const app = express();

// define path for express config

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine & views plocation
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve

app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.render("index", {
    title: "Weather",
    name: "anshu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "anshu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is help message",
    title: "Help",
    name: "Anshu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You Must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "anshu",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "anshu",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is running at port 3000.");
});
