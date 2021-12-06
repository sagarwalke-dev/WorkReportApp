const RecordSchema = require("../model/recordSchema");
let getMonthlyCalculation = async (req, res) => {
  try {
    let { month, year } = req.body;
    console.log("getMonthlyCalculation controller started");
    const records = await RecordSchema.aggregate([
      { $match: { month: month, year: year } },
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$totalAmount" },
          totalHours: { $sum: "$totalHours" },
          amount: { $last: "$amount" },
        },
      },
    ]);
    if (records.length > 0) {
      res.json({ status: 200, data: records });
    } else {
      res.json({ status: 204, data: records });
    }
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = { getMonthlyCalculation };
