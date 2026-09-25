import { Router } from "express";

import userRouter from "./user.routes.js";
import hostelRouter from "./dashboard.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/hostels", hostelRouter);

export default router;