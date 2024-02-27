"use server"
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";

export const addPost = async (formData) =>{        
    const {title,desc,slug,userId} =Object.fromEntries (formData);
try{
    connectToDb();
    const newPost = new Post({
        title,
        desc,
        slug,
        userId
    })
    await newPost.save();

    console.log('new post saved');
    revalidatePath("/blog")

}catch(err){
console.log(err)
return {error:"something went wrong"}
}
    

    console.log(formData)
};



export const deletePost = async (formData) =>{
   
const {id} =Object.fromEntries (formData);
try{
connectToDb();

await Post.findByIdAndDelete(id);

console.log(' post deleted from db');
revalidatePath("/blog")

}catch(err){
console.log(err)
return {error:"something went wrong"}
}


console.log(formData)
};