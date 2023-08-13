import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(200).json("You are not authenticated");

  try {
    const payload = await jwt.verify(token, 'muhammadhaseebsharif');
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next(); 
  } catch (err) {
    res.status(403).send("Token is not valid");
  }
};
