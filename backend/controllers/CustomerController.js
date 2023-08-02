const Customer = require("../models/Customer");

// ADD CUSTOMER
const add = async (req, res) => {
  const { name, business, email, phone, address } = req.body;

  //check if customer exists
  const email_customer = await Customer.findOne({ email });
  const phone_customer = await Customer.findOne({ phone });

  if (email_customer) {
    res.status(422).json({ errors: ["This customer email already exist"] });
    return;
  }
  if (phone_customer) {
    res.status(422).json({ errors: ["This customer phone already exist"] });
    return;
  }

  //Add Customer
  const newCustomer = await Customer.create({
    name,
    business,
    email,
    phone,
    address,
  });

  // If Something went wrong return error
  if (!newCustomer) {
    res.status(422).json({ errors: ["Something went wrong, try again later"] });
  }

  // If customer was created successfully, return customer
  res.status(201).json(newCustomer);
};

//UPDATE CUSTOMER
const update = async (req, res) => {
  const { name, business, email, phone, address } = req.body;
  const { id } = req.params;

  const customer = await Customer.findById(id);

  if (customer) {
    await customer.save();
    res.status(200).json(customer);
  } else {
    res.status(422).json({ errors: ["Something went wrong, try again later"] });
  }
};

// //GET USER BY ID
// const getUserById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id).select("-password");

//     //check if user exists
//     if (!user) {
//       res.status(404).json({ errors: ["User not exist"] });
//       return;
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ errors: ["User not exist"] });
//   }
// };

module.exports = {
  add,
  update,
};
