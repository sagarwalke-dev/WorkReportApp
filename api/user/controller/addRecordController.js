const RecordSchema = require("../model/recordSchema");

let addTaskRecord = async (req, res) => {
  const { date, startTime, endTime, description, amount } = req.body;
  console.log("record add start");
  try {
    if (!date || !startTime || !endTime || !amount) {
      return res.json({ status: 422, message: "Please fill all data" });
    } else {
      let totalHours = 0;
      let totalAmount = 0;
      //add into db
      const record = new RecordSchema({
        date: date,
        startTime: startTime,
        endTime: endTime,
        description: description,
        amount: amount,
        totalHours: totalHours,
        totalAmount: totalAmount,
      });

      const response = await record.save();
      if (response) {
        return res.json({
          status: 201,
          message: "Record Added",
          totalHours: totalHours,
          totalAmount: totalAmount,
        });
      } else {
        return res.json({ status: 400, message: "Failed to add Record" });
      }
    }
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
  console.log("record add end");
};

module.exports = { addTaskRecord };
