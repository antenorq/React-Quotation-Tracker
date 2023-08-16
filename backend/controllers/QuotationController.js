const Quotation = require("../models/Quotation");
const Customer = require("../models/Customer");

// ADD QUOTATION
const add = async (req, res) => {
  const {
    customerId,
    userId,
    status,
    quoteGiven,
    date,
    followUp,
    quoteDetails,
  } = req.body;

  const newQuotation = await Quotation.create({
    customerId,
    userId,
    status,
    quoteGiven,
    date,
    followUp,
    quoteDetails,
  });

  // If Something went wrong return error
  if (!newQuotation) {
    res.status(400).json({ errors: ["Something went wrong, try again later"] });
    return;
  }

  // If quotattion was created successfully, return quotation
  res.status(200).json(newQuotation);
};

//UPDATE quotation
const update = async (req, res) => {
  const { name, business, email, phone, address } = req.body;
  const { id } = req.params;

  try {
    //find Customer by Id
    const quotation = await Quotation.findById(id);

    if (quotation) {
      if (name) quotation.name = name;
      if (business) quotation.business = business;
      if (email) quotation.email = email;
      if (phone) quotation.phone = phone;
      if (address) quotation.address = address;

      //save
      await quotation.save();
      res.status(200).json(quotation);
    } else {
      res.status(422).json({
        errors: ["Customer not found or Something went wrong, try again later"],
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }

  //
  return;
};

//GET ALL QUOTATIONS
const getAll = async (req, res) => {
  try {
    let quotation;
    //ADMIN
    if (req.user.type === 1) {
      quotation = await Quotation.find()
        .populate("customerId")
        .populate("userId");
    }
    //SALESPERSON
    if (req.user.type === 2) {
      quotation = await Quotation.find({ userId: req.user._id })
        .populate("customerId")
        .populate("userId");
    }

    //check if quotation exists
    if (quotation) {
      res.status(200).json(quotation);
    } else {
      res.status(422).json({ errors: ["Quotation list empty"] });
      return;
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = {
  add,
  update,
  getAll,
};