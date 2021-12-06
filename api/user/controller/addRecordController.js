const RecordSchema = require("../model/recordSchema");

let addTaskRecord = async (req, res) => {
  let { date, startTime, endTime, description, amount } = req.body;
  console.log("record add start");
  try {
    if (!date || !startTime || !endTime || !amount) {
      return res.json({ status: 422, message: "Please fill all data" });
    } else {
      let totalMinutes = 0;
      let totalAmount = 0;
      let month;
      let year;
      //add into db
      date = new Date(date);
      month=(date.getMonth())+1;
      year=date.getFullYear();
      date = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + "/" + date.getFullYear();
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      let ms = endTime - startTime;
      endTime = formatAMPM(endTime);
      startTime = formatAMPM(startTime);
      totalMinutes = Math.floor((ms / 1000 / 60) << 0);
      totalAmount = Math.round((amount / 60) * totalMinutes);
      const record = new RecordSchema({
        date: date,
        startTime: startTime,
        endTime: endTime,
        description: description,
        amount: amount,
        totalHours: totalMinutes,
        totalAmount: totalAmount,
        month:month,
        year:year
      });

      const response = await record.save();
      if (response) {
        return res.json({
          status: 201,
          message: "Record Added",
          totalHours: totalMinutes,
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

let addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

let formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = addZero(hours) + ":" + addZero(minutes) + " " + ampm;
  return strTime;
};
module.exports = { addTaskRecord };
