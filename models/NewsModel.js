import mongoose, {models} from "mongoose";

const newsSchema=new mongoose.Schema({
        title:{
                type:String,
                require:true,
                trim:true
        },
       slug:{
                type:String,
                require:true,
                unique:true
        },
        shortDescription:{
                type:String,
                require:true,
                trim:true
        },
        description:{
                type:String,
                require:true,
                trim:true
        },
        viewsCount:{
                type:Number,
                require:true,
                default:0
        },
        author:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                require:true,
                
        },
        categories:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Category",
                require:true,
                
        },
        thumbnailsURL:{
                type:String,
                require:true,
        },
},{timestamps:true})

const News = mongoose.models.News || mongoose.model("News", newsSchema);
export default News;