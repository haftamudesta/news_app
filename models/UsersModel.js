import mongoose, {models} from "mongoose";

const userSchema=new mongoose.Schema({
        email:{
                type:String,
                require:true,
                trim:true
        },
        name:{
                type:String,
                require:true,
                trim:true
        },
        image:{
                type:String,
                require:true,
        },
        role:{
                type:String,
                require:true,
                default:"user",
                enum:{
                        values:["user","admin","superAdmin"],
                        message:"{VALUE} is not supported"
                }
        }
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;