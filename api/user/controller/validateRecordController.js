const RecordSchema = require("../model/recordSchema");
let validateRecord = async (req, res) => {
  try {
    console.log("validateRecord controller started");
    let{id}=req.body;
    const record = await RecordSchema.findOne({_id:id});
    if(record){
        res.json({ status: 200, data:record, isValid: true });
    }else{
    res.json({ status: 200, data:record, isValid: false });
    }
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { validateRecord };
