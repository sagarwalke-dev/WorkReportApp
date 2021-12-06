//load modules
var express = require("express");
const addRecordController = require("../controller/addRecordController");
const getAllController = require("../controller/getAllController");
const deleteAllController = require("../controller/deleteAllController");

const app = express();
var router = express.Router();

router.get("/", function user(req, res) {
  return res.json({ status: 200, message: "Record Module" });
});

router.post("/addRecord", function (req, res) {
  addRecordController.addTaskRecord(req, res);
});

router.get("/getAll", function (req, res) {
  getAllController.getAll(req, res);
});

router.get("/deleteAll", function (req, res) {
  deleteAllController.deleteAll(req, res);
});

module.exports = router;
