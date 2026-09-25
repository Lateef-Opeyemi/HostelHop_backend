import { Router } from "express";

import {
    authenticate,
    lanlordonly,
    studentonly
} from "../middleware/user.middleware.js";

import {
    deleteHostel,
    getAllHostel,
    getMyHostels,
    getSingleHostel,
    updateHostel,
    hostel
} from "../controllers/hostel.controllers.js";

const router = Router();

router.post("/", authenticate, lanlordonly, hostel);

router.get("/", authenticate, getAllHostel);

router.get("/my-hostels", authenticate, lanlordonly, getMyHostels);

router.get("/:id", authenticate, getSingleHostel);

router.put("/:id", authenticate, lanlordonly, updateHostel);

router.delete("/:id", authenticate, lanlordonly, deleteHostel);

export default router;