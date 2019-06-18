const express = require("express");
const apiRoute = require("./routes/api/");
const parser = require("body-parser");
const app = express();
const passport = require("passport");
const PORT = process.env.PORT || 8001;
const https = require("https");
const fs = require("fs");

// HTTPS Redirect for node on heroku
// app.configure('production' => {
//
// })

// middleware telling system
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Passport middlewar
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/api/", apiRoute);

// if app is not an api route then check if file is in client build
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
