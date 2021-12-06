const RecordSchema = require("../model/recordSchema");
let getByMonthAndYear = async (req, res) => {
  try {
    console.log("getByMonthAndYear controller started");
    let {month,year}=req.body;
    const records = await RecordSchema.find({'month':month,'year':year}).sort({ date: -1 });
    res.json({ status: 200, data: records });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { getByMonthAndYear };
