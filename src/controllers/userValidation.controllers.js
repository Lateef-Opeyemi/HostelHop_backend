import User from "../models/userValidation.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateAcessToken,
    generateRefreshToken
} from "../service/services.js";
import { userValidator } from "../validator/user.validator.js";

export async function signup(req, res) {
    const body = req.body;

    if (!body) {
        return res.status(400).send({
            detail: "Request body is required"
        });
    }

    const { error, value } = userValidator.validate(body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).send({
            error: error.details
        });
    }

    const { name, email, password, phonenumber, role } = value;

    try {
        const emailexist = await User.findOne({ email });

        if (emailexist) {
            return res.status(400).send({
                detail: "Email already exists"
            });
        }

        if (role === "landlord") {
            if (!phonenumber) {
                return res.status(400).send({
                    detail: "Phone number is required for landlord"
                });
            }

            const phonenumberexist = await User.findOne({ phonenumber });

            if (phonenumberexist) {
                return res.status(400).send({
                    detail: "Phone number already exists"
                });
            }
        }

        const passwordhash = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: passwordhash,
            phonenumber,
            role
        });

        const { password: _, ...userWithoutpassword } = user.toObject();

        return res.status(201).send({
            detail: "User created successfully",
            user: userWithoutpassword
        });

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function getUser(req, res) {
    try {
        const user = await User.find();

        return res.status(200).send({
            user
        });

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function signin(req, res) {
    const body = req.body;

    if (!body) {
        return res.status(400).send({
            detail: "Request body is required"
        });
    }

    const { nameOremail, password } = body;

    if (!nameOremail || !password) {
        return res.status(400).send({
            detail: "Name/email and password are required"
        });
    }

    try {
        const user = await User.findOne({
            $or: [
                { name: nameOremail },
                { email: nameOremail }
            ]
        }).select("+password");

        if (!user) {
            return res.status(400).send({
                detail: "Invalid login credentials"
            });
        }

        const ispasswordcorrect = await user.comparePassword(password);

        if (!ispasswordcorrect) {
            return res.status(400).send({
                detail: "Invalid login credentials"
            });
        }

        const token = {
            accesstoken: generateAcessToken(user),
            refreshtoken: generateRefreshToken(user)
        };

        return res.status(200).send({
            detail: "Login successful",
            token
        });

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export function getprofile(req, res) {
    console.log(req.user);

    return res.status(200).send({
        user: req.user
    });
}


export async function refreshAccessToken(req, res) {
    const body = req.body;

    if (!body) {
        return res.status(400).send({
            detail: "Request body is required"
        });
    }

    const { refreshToken } = body;

    if (!refreshToken) {
        return res.status(400).send({
            detail: "Refresh token not available in request body"
        });
    }

    try {
        const decodeduser = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH
        );

        const userid = decodeduser.userid;

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).send({
                detail: "User not found"
            });
        }

        const token = generateAcessToken(user);

        return res.status(200).json({
            accessToken: token
        });

    } catch (e) {
        return res.status(401).send({
            detail: "Invalid refresh token"
        });
    }
}