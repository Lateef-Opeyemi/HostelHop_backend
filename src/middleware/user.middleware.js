import jwt from "jsonwebtoken";
import env from "../config/env.js";
import user from "../models/userValidation.model.js";

export async function authenticate(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).send({
            detail: "No authorization header"
        });
    }

    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).send({
            detail: "Bearer token is required"
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const decodedUser = jwt.verify(token, env.JWT_ACCESS);

        const userid = decodedUser.userid;

        const foundUser = await user.findById(userid);

        if (!foundUser) {
            return res.status(401).send({
                detail: "User not found"
            });
        }

        req.user = foundUser.toObject();

        next();

    } catch (e) {
        return res.status(401).send({
            detail: "Invalid or expired token"
        });
    }
}


export async function lanlordonly(req, res, next) {
    if (!req.user) {
        return res.status(401).send({
            detail: "User not found"
        });
    }

    if (req.user.role !== "landlord") {
        return res.status(403).send({
            detail: "Access denied"
        });
    }

    next();
}


export async function studentonly(req, res, next) {
    if (!req.user) {
        return res.status(401).send({
            detail: "User not found"
        });
    }

    if (req.user.role !== "student") {
        return res.status(403).send({
            detail: "Access denied"
        });
    }

    next();
}