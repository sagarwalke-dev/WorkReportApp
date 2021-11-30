//load modules
var express = require("express");
const addRecordController = require("../controller/addRecordController");
const app = express();
var router = express.Router();

router.get("/", function user(req, res) {
  return res.json({ status: 200, message: "Record Module" });
});

router.post("/addRecord", function (req, res) {
  addRecordController.addTaskRecord(req, res);
});

module.exports = router;
