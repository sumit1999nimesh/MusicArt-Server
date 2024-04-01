const express = require('express');
const bodyParser = require('body-parser');
const auth = require("../Middleware/auth");
const dotenv = require('dotenv');
const {getAllOrders, createOrder,signup,saveFeedback, login,addingToCart,getTotalProductsForUser,updateProductQuatity,getCartforUser } = require('../Controllers/userController');

const userRouter =express.Router();

userRouter.post("/signup" ,signup);
userRouter.post("/login" ,login);
userRouter.post("/feedback" ,auth,saveFeedback);
userRouter.post("/addtocart/:productId" , auth,addingToCart);
userRouter.get("/getTotalProductsForUser" , auth , getTotalProductsForUser);
userRouter.post("/updateProductQuatity" ,auth, updateProductQuatity);
userRouter.get("/getcartforuser" ,auth, getCartforUser);
userRouter.post("/createorder" , auth,createOrder);
userRouter.get("/getAllOrders" , auth,getAllOrders);
module.exports= userRouter;