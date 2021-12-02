//load mongoose module.
const mongoose = require("mongoose");
const db = require("../../services/database");

//creating userSchema
let RecordSchema = mongoose.Schema({
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  description: { type: String },
  amount: { type: Number },
  totalHours: { type: Number },
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now() }
},
  {
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
  });

//Hashing password before save into DB
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("userPassword")) {
//     console.log("Hashing password...");
//     if ((this.userPassword = await bcrypt.hash(this.userPassword, 15)));
//     if (
//       (this.userConfirmPassword = await bcrypt.hash(
//         this.userConfirmPassword,
//         15
//       ))
//     );
//   }
//   next();
// });

//generating token
// UserSchema.methods.generateAuthToken = async function (name) {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token, name: name });
//     this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

//exporting by making public
module.exports = mongoose.model("record", RecordSchema);
