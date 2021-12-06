const RecordSchema = require("../model/recordSchema");
let deleteAll = async (req, res) => {
  try {
    console.log("delete all controller started");
    const records = await RecordSchema.deleteMany();
    res.json({ status: 200, data: records });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { deleteAll };
