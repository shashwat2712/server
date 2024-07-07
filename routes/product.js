const express = require("express")
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
const e = require("express");


//api/products?category = Essential
//api/amazon?theme = dark
productRouter.get('/api/products',auth ,async(req,res) =>{
    try {
        console.log(req.query.category);
        const products = await Product.find({category : req.query.category});
        res.json(products);
        console.log('fetching fetching');
        console.log('products');
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});
//put ':' to access
productRouter.get('/api/products/search/:name',auth ,async(req,res) =>{
    try {
        console.log(req.params.name);
        const products = await Product.find({
            name : {$regex : req.params.name,$options : "i"},
        }).limit(10);
        res.json(products);
        console.log(products);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});
productRouter.get('/api/deal-of-day',auth,async(req,res) =>{
    try {
        let products = await Product.find({});
        // console.log(products)
        products = products.sort((a, b) => {
            let aSum = 0;
            let bSum = 0;
        
            // Sum the ratings for product 'a'
            for (let i = 0; i < a.ratings.length; i++) {
                aSum += a.ratings[i].rating;
            }
        
            // Sum the ratings for product 'b'
            for (let i = 0; i < b.ratings.length; i++) {
                bSum += b.ratings[i].rating;
            }
        
            // Sort in descending order based on the sum of ratings
            return bSum - aSum;
        });
        
        // console.log(products[0])
        res.json(products[0]);

    } catch (error) {
        res.status(500).json({error : e.message});
    }
})
productRouter.get('/api/products/search/:name',auth ,async(req,res) =>{
    try {
        console.log(req.params.name);
        const products = await Product.find({
            name : {$regex : req.params.name,$options : "i"},
        });
        res.json(products);
        console.log(products);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

//creating a post request route to rate the product.
productRouter.post('/api/rate-product',auth,async(req,res)=>{
    try {
        const {id,rating} = req.body;

        //dont make product const bcoz we need to change it's properties
        let product = await Product.findById(id);
        for(let i = 0; i < product.ratings.length; i++){
            if(product.ratings[i].userId == req.user){
                product.ratings.splice(i,1);
                break;

            }
        }
        const ratingSchema = {
            userId : req.user,
            rating,
        };
        console.log(ratingSchema);
        product.ratings.push(ratingSchema);
        product = await product.save();
        res.json(product);

    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

module.exports = productRouter;