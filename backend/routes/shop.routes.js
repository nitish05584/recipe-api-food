




const express=require("express");
const createEditShop = require("../controllers/shop.controllers");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/multer");




const shopRouter=express.Router()



shopRouter.get("/create-edit",isAuth,upload.single("image"),createEditShop)






module.exports=shopRouter