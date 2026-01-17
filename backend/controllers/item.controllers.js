const Item = require("../models/item.model");
const Shop = require("../models/shop.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const addItem=async(req,res)=>{
    try {
        const {name,category,foodType,price}=req.body

        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        const shop=await Shop.findOne({owner:req.userId})

        if(!shop){
            return res.status(400).json({message:"shop not found"})
        }

        const item=await Item.create({
            name,category,foodType,price,image,shop:shop._id 
        })

        return res.status(201).json(item)

    } catch (error) {
        return res.status(500).json({message:`add item error ${error}`}) 
    }
}
