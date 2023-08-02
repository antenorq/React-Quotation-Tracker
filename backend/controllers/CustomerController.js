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

// //SIGN IN
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   //check if user exists
//   if (!user) {
//     res.status(404).json({ errors: ["User not exists"] });
//     return;
//   }

//   //check if password matches
//   if (!(await bcrypt.compare(password, user.password))) {
//     res.status(422).json({ errors: ["Invalid password"] });
//     return;
//   }

//   //return user with token
//   res.status(201).json({
//     _id: user._id,
//     token: generateToken(user._id),
//   });
// };

// //GET CURRENT LOGGED IN USER
// const getCurrentUser = async (req, res) => {
//   const user = req.user;
//   res.status(200).json(user);
// };

// //UPDATE AN USER
// const update = async (req, res) => {
//   const { name, email, password } = req.body;

//   const reqUser = req.user;
//   const user = await User.findById(reqUser._id).select("-password");

//   if (name) {
//     user.name = name;
//   }

//   if (email) {
//     user.email = email;
//   }

//   if (password) {
//     //Generate password hash
//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);

//     user.password = passwordHash;
//   }

//   await user.save();

//   res.status(200).json(user);
// };

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
};
