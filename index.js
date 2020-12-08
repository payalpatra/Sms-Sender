const express = require("express");
const fast2sms = require("fast-two-sms");
const CryptoJS = require("crypto-js");

// secp256k1 --> This is the curve used to genrate shared key is 256 bit long. This is the curve that bitcoin uses .
const app = express();
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/sendMessage", async (req, res) => {
  ///////////////////////////// API ////////////////////////////
  const message = req.body.message;
  const response = await fast2sms
    .sendMessage({
      authorization: process.env.API_KEY,
      message: message,
      numbers: [req.body.number],
    })
    .catch((e) => {
      console.log(e);
    });
  res.render("messageSent.ejs");
});

app.listen(3000, () => {
  console.log("port is running on 3000");
});
