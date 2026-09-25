import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
const PORT = env.PORT || 3005;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
}
start(); 
