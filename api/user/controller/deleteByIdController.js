const RecordSchema = require("../model/recordSchema");
let deleteById = async (req, res) => {
    console.log("deleteById controller started");
  try {
      let{id}=req.body;
    const records = await RecordSchema.deleteOne({_id: id});
    res.json({ status: 200, data: records });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
  console.log("deleteById controller ended");
};

module.exports = { deleteById };
