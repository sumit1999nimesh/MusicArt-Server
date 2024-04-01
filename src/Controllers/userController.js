const userModel =require("../Models/User");
const cartModel =require("../Models/Cart");
const orderModel =require("../Models/Order");
const feedbackModel =require("../Models/Feedback");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const signup= async(req,res)=>{
 
    const { name, email, password,phonenumber } = req.body;
    
    if (!name || !email || !password ||!phonenumber) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    
    console.log(email);
      try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already registered. Please use a different email.' });
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser =await userModel.create({
           name:name, 
           email: email,
           phonenumber: phonenumber,
            password: hashedPassword }
        );
   
       const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.SECRET_KEY);     
    
        res.status(201).json({ user: newUser, token:token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    }


const login= async(req,res)=>{
    const {  email, password } = req.body;
    if (!email|| !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
      }

      try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
          return res.status(400).json({ error: 'User Not found' });
        }

        const matchPassword= await bcrypt.compare(password ,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
            const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY);     
            return res.status(200).json({ user: existingUser, token:token  });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

  const addingToCart=  async(req,res)=>{ 
 

   const productId = req.params.productId;
   console.log('Product ID:' + productId);
   const userId=req.userId;
    console.log(JSON.stringify(req.body))
    
    try {
      let cart = await cartModel.findOne({userId });
  
      if (!cart) {
        // Create a new cart if it doesn't exist
        cart = new cartModel({
          userId,
          products: new Map([[productId, 1]]), // Initialize with product ID and quantity 1
          totalProducts: 1
        });
      } else {
        if (cart.products.has(productId)) {
          const currentQuantity = cart.products.get(productId);
          if (currentQuantity >= 8) {
            return res.status(406).json({ message: 'Maximum 8 quantity exceeded' });
          }
          cart.products.set(productId, currentQuantity + 1);
        } else {
          cart.products.set(productId, 1);
        }
        cart.totalProducts++;
      }

      await cart.save();
  
      res.status(200).json({ message: 'Product added/updated in the cart', cart });
    } catch (error) {
      console.error('Error adding/updating product in the cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  
  }
  
  const getTotalProductsForUser=  async(req,res)=>{ 
    const userId=req.userId;
    console.log('total product ' +userId)
    try {
      totalProduct=0
      const cart = await cartModel.findOne({ userId });
      if (cart) {
        totalProduct =cart.totalProducts;
        console.log('total product ' +totalProduct)
     res.status(200).json(totalProduct);
      }
      else 
      { 
        console.log('reeturb');
        res.status(404).json(0); }
    } catch (error) {
      console.error('Error fetching totalProducts:', error);
    
    }
  }

  const updateProductQuatity=  async(req,res)=>{ 
    const userId=req.userId;
    const {productId, quantity } = req.body;
    try {
      const cart = await cartModel.findOne({ userId });
      
      if (cart.products.has(productId)) 
     { const pastquan =cart.products.get(productId);  
      cart.products.set(productId, quantity);
      
       totalp=cart.totalProducts 
  cart.totalProducts = parseInt(totalp) +  parseInt(quantity)-parseInt(pastquan);
  
      await cart.save();
      res.status(200).json("Success");

     }
      
    }catch (error) {
      console.error('Error fetching totalProducts:', error);

    }
  }
  const getCartforUser=  async(req,res)=>{ 
    const userId=req.userId;
    console.log('userId ID:' + userId);
    try {
      const cart = await cartModel.findOne({ userId });
      res.status(200).json(cart);

     }
      catch (error) {
      console.error('Error fetching totalProducts:', error);
    }
  }
  const createOrder=  async(req,res)=>{ 
    const userId=req.userId;
  try {
    const { name, address, paymentType, products, grandTotal } = req.body;

    // Create new order
    const order = new orderModel({
      userId,
      name,
      address,
      paymentType,
      products,
      grandTotal
    });
    cartModel.deleteMany({ userId: userId })
    .then(() => {
      console.log('All data for the user has been deleted successfully.');
    })
    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getAllOrders=  async(req,res)=>{ 
  const userId=req.userId;

  try {

    const orders = await orderModel.find({ userId: userId });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const saveFeedback = async (req, res) => {
  const { feedbackType, feedbackText } = req.body;
  const userId=req.userId;

  try {
    const feedback = new feedbackModel({
      userId,
      feedbackType,
      feedbackText,
    });

    await feedback.save();

    res.status(200).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  

module.exports = {saveFeedback,signup,login,addingToCart,getTotalProductsForUser,updateProductQuatity, getCartforUser,createOrder,getAllOrders}