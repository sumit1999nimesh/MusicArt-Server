

const productModel =require("../Models/Product");



const getProductByID= async(req,res)=>{

 const id=req.params.productid;
    
  console.log('getProductByID' + id)
    try {
        console.log('start')
        const product=await productModel.findById(id);
   
     res.status(200).json(product);

} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong' });
}
  }

  const searchByname= async(req,res)=>{
    try {
        // Extract search parameters from the request query
        const { name, minPrice, maxPrice, company, color, type, sortBy, sortOrder } = req.query;
    
        // Construct the query object dynamically based on the provided search parameters
        const query = {};
        if (name) {
          // Use a regular expression for partial matching on the 'name' field
          query.name = { $regex: name, $options: 'i' }; // 'i' option for case-insensitive matching
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
          query.price = {};
          if (minPrice !== undefined) query.price.$gte = minPrice; // Greater than or equal to minPrice
          if (maxPrice !== undefined) query.price.$lte = maxPrice; // Less than or equal to maxPrice
        }
        if (company) query.company = company;
        if (color) query.color = color;
        if (type) query.type = type;
    
        // Construct the sort object based on the provided sortBy and sortOrder parameters
        const sort = {};
        if (sortBy) {
          // Specify the field to sort by
          sort[sortBy] = sortOrder === 'desc' ? -1 : 1; // Use -1 for descending order, 1 for ascending order
        }
    
        // Fetch products that match the specified criteria, sorted as specified
        const products = await productModel.find(query).sort(sort);
    
        // Send the matched and sorted products as the response
        res.json(products);
      } catch (error) {
        // Handle errors
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  


  module.exports = {getProductByID,searchByname}