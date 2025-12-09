import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userID) => {
    const token = jwt.sign({id:userID},process.env.JWT_SECRET,{expiresIn:"1d"})
    return token;
}
    
export default generateToken;