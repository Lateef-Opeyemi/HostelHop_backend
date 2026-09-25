import env from "../config/env.js";
import jwt from "jsonwebtoken"
export function generateAcessToken(user){
    return jwt.sign(
        {userid:user._id.toString(), role:user.role},
        env.JWT_ACCESS,
        {expiresIn:"5m"}
    )
}
export function generateRefreshToken(user){
    return jwt.sign(
        {userid:user._id.toString(), role:user.role},
        env.JWT_REFRESH,
        {expiresIn:"7d"}
    )
}