const express = require('express');
const auth = require("../Middleware/auth");
const {getProductByID,searchByname} =require('../Controllers/PruductController');
const productRouter =express.Router();

productRouter.get("/getProductByID/:productid" , getProductByID);
productRouter.get("/search" , searchByname);

/*
productRouter.post("/createtask" ,auth , CreateTask);

productRouter.delete("/:id" ,auth , deleteTask);

productRouter.put("/updatetask/:id" ,auth , updateTask);
productRouter.get("/gettaskpublic/:taskid" , getTaskPublic);
productRouter.put("/updatetaskstate/:taskid/:state" , auth,updateTaskstate);
 
*/
module.exports= productRouter;