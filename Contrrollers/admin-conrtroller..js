import Admin from "../Models/Admin";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';



export const addAdmin = async(req,res,next)=>{
    const {email,password} = req.body;
    if (!email && email.trim() == " " && !password.trim() == " ") {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
        
    } catch (error) {
        return console.log(error)
        
    }
    if(existingAdmin){
        return res.status(400).json({message:"Admin already Exists"});
    }

    var salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let admin;
  
    try {
        admin = new Admin({email,password: hashedPassword });
        admin = await admin.save();
        
    } catch (error) {
        return console.log(error);
        
    }
    if(!admin){
        return res.status(500).json({message:"unable to store the admin"});
    }
    return res.status(201).json({admin});
}


export const adminLogin = async(req,res,next)=>{
    const {email,password} = req.body;
    if (!email && email.trim() == " " && !password.trim() == " ") {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      let existingAdmin;
      try {
        existingAdmin = await Admin.findOne({email});
        
      } catch (error) {
        return console.log(error);
        
      }
      if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"});
      }

      const  isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password);
      if(!isPasswordCorrect){
        return res.status(400).json({message:"Incoreect password"});
      }
      const token = jwt.sign({id:existingAdmin._id}, process.env.SECRET_KEY,{
        expiresIn:"7d",
      });
      return res.status(200).json({message:"Authenticated complete",token,id:existingAdmin._id});

}