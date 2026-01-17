




const express=require("express");
const createEditShop = require("../controllers/shop.controllers");
const isAuth = require("../middlewares/isAuth");




const shopRouter=express.Router()



shopRouter.get("/create-edit",isAuth,createEditShop)






module.exports=shopRouter