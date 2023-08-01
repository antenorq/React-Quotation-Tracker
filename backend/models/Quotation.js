const mongoose = require("mongoose");
const { Schema } = mongoose;

const quotationSchema = new Schema(
  {
    customerId: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    status: String,
    quoteGiven: String,
    date: Date,
    followUp: Date,
    quoteDetails: String,
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;