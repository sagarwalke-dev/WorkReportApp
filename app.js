const express = require("express");
const app = express();
const path = require("path");
const recordRouter = require("./api/user/routes/recordRouter");
const db = require("./api/services/database");
const cors = require("cors");
const configEnv = require("dotenv").config({
  path: path.join(__dirname, "./config.env"),
});

app.use(cors());
app.use(express.json());
//configure router middleware here
app.use("/api/record/", recordRouter);

module.exports = app;
