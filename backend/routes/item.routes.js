







const express=require("express");

const isAuth = require("../middlewares/isAuth");
const { addItem, editItem } = require("../controllers/item.controllers");
const upload = require("../middlewares/multer");




const itemRouter=express.Router()



itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)


itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)






module.exports=itemRouter