import { Router } from "express";

import {
    signin,
    signup,
    getprofile,
    getUser,
    refreshAccessToken
} from "../controllers/userValidation.controllers.js";

import {
    authenticate,
    studentonly,
} from "../middleware/user.middleware.js";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/profile", authenticate, studentonly, getprofile);

router.get("/", authenticate, studentonly, getUser);

router.post("/refresh", refreshAccessToken);

export default router;