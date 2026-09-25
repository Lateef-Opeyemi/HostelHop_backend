import mongoose from "mongoose";
import env from "../config/env.js"
const connectionurl = env.db_url;
mongoose.set("strictQuery", true)
export default async function connectDB(){
    try{

        if(!connectionurl){
            console.log(`Database not set`);
            process.exit(1)
        }
        console.log(`Awaiting Database connection`);
        await mongoose.connect(connectionurl)
        console.log(`Database connected successfully`);
        
    }
    catch(e){
        console.log(`An error occured${e}`);
        process.exit(1)
    }
}