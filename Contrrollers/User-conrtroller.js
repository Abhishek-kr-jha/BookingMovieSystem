import User from "../Models/User";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(err);
  }
  if (!users) {
    return response.status(500).json({ message: "Unexcepted Error Occured" });
  }
  return res.status(200).json({ users });
};

export const singup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email.trim() == " " &&
    !password.trim() == " "
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  var salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;

  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email.trim() == " " &&
    !password.trim() == " "
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  var salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ message: "updated successfully" });
};

export const deleteuser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "something went wrongs" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() == " " && !password.trim() == " ") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({email});


    
  } catch (error) {
    return console.log(error)
    
  }

  if(!existingUser){
    return res.status(404).json({message:"unable to find user from this ID "})
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if(!isPasswordCorrect){
    return res.status(400).json({message:"incorrect password"})

  }
  return res.status(200).json({message:"Login successfull"})
};
