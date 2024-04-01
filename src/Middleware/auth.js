const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const auth = (req, res, next) => {
    try{
  let token = req.headers.authorization;

  if (token) { 
    token =token.split(" ")[1];
    let user=jwt.verify(token, process.env.SECRET_KEY);
    req.userId=user.id;
  }
  else
  {
  return res.status(401).json({ error: 'Unauthorized - Missing token' });
 
  }

    next();
 }  catch(error){
    console.log(error);
    return res.status(401).json({ error: 'Unauthorized' });
 
 }

  }


module.exports = auth;