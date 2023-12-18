// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.enable("trust proxy"); // Only if you're sure you're behind a reverse proxy

app.get("/api/whoami", function (req, res) {
  let ipaddress =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-client-ip"] ||
    req.socket.remoteAddress;
  console.log(ipaddress);
  const language = req.get("Accept-Language");
  const software = req.get("User-Agent");

  // Split by comma and take the first value (in case of multiple IPs)
  ipaddress = ipaddress.split(",")[0];

  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
