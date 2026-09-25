import bcrypt from "bcrypt";
import mongoose from "mongoose"

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,

    },
    email:{
type:String,
required:true,
trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        select:false
    },
    phonenumber:{
        type:String
    },
   role: {
    type: String,
    enum: ["student", "landlord"],
    default: "student",
    required: true
}
},
{
timestamps:true
},
)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default mongoose.model("user", userSchema)

