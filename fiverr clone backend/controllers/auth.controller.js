import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register a user
export const register = async (req, res , next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    next(err.message)
  }
};

//Login User

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (user) {
        const token = jwt.sign({
              id: user._id,
              isSeller: user.isSeller,
            },
            'muhammadhaseebsharif' );
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
       
        const { password, ...info } = user._doc;

        return res.cookie('accessToken',token,{
            httpOnly: true
        }).status(201).json({
            success: true,
            ...info,
          });
      } else {
        return res.status(403).send("Invalid Password");
      }
    } else {
      return res.status(501).send("user does not exist");
    }
  } catch (err) {
    res.send(err);
  }
};


//logout user

export const logOut = async(req, res)=>{
    try{
  res.clearCookie("accessToken",{
    sameSite:"none",
    secure: true
}).status(200).send("User has loggedOut")
    }catch(err){
        res.send(err)
    }
}