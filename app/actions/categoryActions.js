"use server"

import fileUploader from "@/lib/fileUploader";
import { connectToMongoDB } from "@/lib/mongoDB";
import Category from "@/models/CategoriesModel";
import Joi from "joi";
const joiCategoryCreateSchema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        thumbnailUrl:Joi.string().required(),
})
const joiCategoryUpdateSchema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        thumbnailUrl:Joi.string().allow('').optional(),
})

export const fetchAllCategoriesAction=async()=>{
        try {
                console.log("connecting to fetch all categories action")
             await connectToMongoDB();
             const result=await Category.find();
             const categories=JSON.parse(JSON.stringify(result));
             return categories;
        } catch (error) {
            throw new Error(error.message);    
        }
}

export const fetchCategoryAction = async (categoryId) => {
  try {
    await connectToMongoDB();
    const category = await Category.findById(categoryId).lean(); 
    return category ? {
      ...category,
      _id: category._id.toString(),
      createdAt: category.createdAt?.toISOString(),
      updatedAt: category.updatedAt?.toISOString()
    } : null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export const createCategoryAction=async (formData)=>{
        try {
                const name=formData.get("name")?.toString();
                const description=formData.get("description")?.toString();
                const thumbnailImage = formData.get("thumbnailImage"); 
               

                 if (!name || !description) {
                        throw new Error("Name and description are required");
                }
                if (!thumbnailImage) {
                        throw new Error("Thumbnail image is required");
                }
                
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                if (!allowedTypes.includes(thumbnailImage.type)) {
                        throw new Error("Only JPEG, JPG, and PNG image formats are allowed");
                }
        const thumbnailUrl=await fileUploader(thumbnailImage,"images");
        const {error,value}=joiCategoryCreateSchema.validate({name,description,thumbnailUrl}) ;
        if(error){
                console.error("Validation failed:", error);
                throw new Error(error.details.map((d) => d.message).join(", "));
        }
        await connectToMongoDB();
        const result=await Category.create({
                name,
                description,
                thumbnailUrl
        })
        if(result){
                return {success:true}
        }
        } catch (error) {
             return {error:error.message}   
        }

}

export const updateCategoryAction = async (formData) => {
  try {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const thumbnailImage = formData.get("thumbnailImage");
    const categoryId = formData.get("categoryId")?.toString();

    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    let thumbnailUrl;
    if (thumbnailImage && thumbnailImage.size > 0) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(thumbnailImage.type)) {
        throw new Error("Invalid image type. Only JPEG/JPG/PNG are allowed");
      }
      
      thumbnailUrl = await fileUploader(thumbnailImage, "images");
    }
    const { error } = joiCategoryCreateSchema.validate({ 
      name, 
      description,
      thumbnailUrl: thumbnailUrl || undefined 
    });

    if (error) {
      throw new Error(error.details[0].message);
    }
     await connectToMongoDB();
    const existingCategory = await Category.findOne({ _id: categoryId });

    if (!existingCategory) {
      throw new Error("Category does not exist");
    }

    existingCategory.name = name;
    existingCategory.description = description;
    
    if (thumbnailUrl) {
      existingCategory.thumbnailImage = thumbnailUrl;
    }
    await existingCategory.save();
    
    return { success: true };
  } catch (error) {
    console.error("Update category error:", error);
    return { error: error.message };
  }
}

export const deleteCategoryAction=async(_id)=>{
        try {
                await connectToMongoDB();
                const result=await Category.findByIdAndDelete(_id);
                if(result){
                        return{success:true}
                }
        } catch (error) {
                return {error:error.message}
        }
}