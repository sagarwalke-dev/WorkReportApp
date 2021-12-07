//load modules
var express = require("express");
const addRecordController = require("../controller/addRecordController");
const getAllController = require("../controller/getAllController");
const deleteByIdController = require("../controller/deleteByIdController");
const getByMonthAndYearController = require("../controller/getByMonthAndYearController");
const getMonthlyCalculationController = require("../controller/getMonthlyCalculationController");


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

router.post("/deleteById", function (req, res) {
  deleteByIdController.deleteById(req, res);
});

router.post("/getByMonthAndYear", function (req, res) {
  getByMonthAndYearController.getByMonthAndYear(req, res);
});

router.post("/getMonthlyCalculation", function (req, res) {
  getMonthlyCalculationController.getMonthlyCalculation(req, res);
});

module.exports = router;
