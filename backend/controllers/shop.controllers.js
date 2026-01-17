const uploadOnCloudinary = require("../utils/cloudinary");



const creatteShop=async(req,res)=>{
    try {
        const {name,city,state,address}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
    } catch (error) {
        
    }
}