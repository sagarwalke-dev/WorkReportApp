const RecordSchema = require("../model/recordSchema");
let getByRecordID = async (req, res) => {
  try {
    console.log("getByRecordID controller started");
    let{id}=req.body;
    const records = await RecordSchema.find({_id:id});
    res.json({ status: 200, data: records });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { getByRecordID };
