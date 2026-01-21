




const express=require("express");

const isAuth = require("../middlewares/isAuth");

const upload = require("../middlewares/multer");

const { createEditShop, getMyShop, getShopByCity } = require("../controllers/shop.controllers");




const shopRouter=express.Router()



shopRouter.post("/create-edit",isAuth,upload.single("image"),createEditShop)

shopRouter.get("/get-my",isAuth,getMyShop)


shopRouter.get("/get-by-city",isAuth,getShopByCity)






module.exports=shopRouter