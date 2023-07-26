const mongoose = require("mongoose");
const { Schema } = mongoose;

const statusSchema = new Schema(
  {
    description: String,
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", userSchema);

module.exports = Status;
