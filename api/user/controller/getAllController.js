const RecordSchema = require("../model/recordSchema");
let getAll = async (req, res) => {
  try {
    console.log("get all controller started");
    const records = await RecordSchema.find().sort({ date: -1 });
    res.json({ status: 200, data: records });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { getAll };
