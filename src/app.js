import express from "express";
import router from "../src/routes/index.js";
import cors from "cors"
const app = express();
app.use(express.json({limit:"10mb"}));
app.use(cors())
app.use("/", router);
export default app;