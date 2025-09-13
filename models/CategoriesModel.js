import mongoose, {models} from "mongoose";

const categorySchema=new mongoose.Schema({
        name:{
                type:String,
                require:true,
                trim:true
        },
        description:{
                type:String,
                require:true,
                trim:true
        },
        thumbnailsURL:{
                type:String,
                require:true,
        },
},{timestamps:true})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;