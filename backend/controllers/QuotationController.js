const Quotation = require("../models/Quotation");

const multer = require("multer");
const path = require("path");

// UPLOAD ADDFILE
const addfile = async (req, res) => {
  let fetch_file = null;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join("uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({ storage });

  upload.single("file")(req, {}, function (err) {
    if (err) throw err;
    fetch_file = req.file;
    res.json({ file: req.file, message: "File uploaded successfully!" });
  });

  //UPDATE QUOTATION WITH THE FILENAME
  if (fetch_file) {
    const quotation = await Quotation.findById(req.quotation_id);
    quotation.file = fetch_file;

    //save
    await quotation.save();
    res.status(200).json(quotation);
  }
};

// ADD QUOTATION
const add = async (req, res) => {
  const { customerId, userId, status, quoteGiven, date, followUp, quoteDetails } = req.body;

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
  const { customerId, userId, status, quoteGiven, date, followUp, quoteDetails } = req.body;

  const { id } = req.params;

  try {
    //find quotation by Id
    //const quotation = await Quotation.findById(id).populate("customerId").populate("userId");
    const quotation = await Quotation.findById(id);

    if (quotation) {
      if (customerId) quotation.customerId = customerId;
      if (userId) quotation.userId = userId;
      if (status) quotation.status = status;
      if (quoteGiven) quotation.quoteGiven = quoteGiven;
      if (date) quotation.date = date;
      if (followUp) quotation.followUp = followUp;
      if (quoteDetails) quotation.quoteDetails = quoteDetails;

      //save
      await quotation.save();
      res.status(200).json(quotation);
    } else {
      res.status(422).json({
        errors: ["Quotation not found or Something went wrong."],
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }

  //
  return;
};

//GET QUOTATION BY ID
const getQuotationById = async (req, res) => {
  const { id } = req.params;

  try {
    const quotation = await Quotation.findById(id).populate("customerId").populate("userId");

    //check if quotation exists
    if (!quotation) {
      res.status(404).json({ errors: ["Quotation not exist"] });
      return;
    }

    res.status(200).json(quotation);
  } catch (error) {
    res.status(404).json({ errors: ["Quotation not exist or Something Went Wrong"] });
  }
};

//GET STATUS FROM USER
const getStatusByUserId = async (req, res) => {
  try {
    let quotation;
    //ADMIN
    if (req.user.type === 1) {
      quotation = await Quotation.find().populate("customerId").populate("userId");
    }
    //SALESPERSON
    if (req.user.type === 2) {
      quotation = await Quotation.find({ userId: req.user._id }).populate("customerId").populate("userId");
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

//DELETE QUOTATION BY ID
const deleteQuotationById = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);

    //check if quotation exists
    if (!quotation) {
      res.status(404).json({ errors: ["Quotation not exist"] });
      return;
    }

    await Quotation.findByIdAndDelete(quotation._id);

    res.status(200).json(quotation);
  } catch (error) {
    res.status(404).json({ errors: ["Quotation not exist or Something Went Wrong"] });
  }
};

//GET ALL QUOTATIONS
const getAll = async (req, res) => {
  try {
    let quotation;
    //ADMIN
    if (req.user.type === 1) {
      quotation = await Quotation.find().populate("customerId").populate("userId");
    }
    //SALESPERSON
    if (req.user.type === 2) {
      quotation = await Quotation.find({ userId: req.user._id }).populate("customerId").populate("userId");
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
  addfile,
  update,
  getAll,
  getQuotationById,
  deleteQuotationById,
};
