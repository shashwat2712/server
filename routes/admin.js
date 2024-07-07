const express = require('express');
const adminRouter = express.Router();
const admin = require('../middlewares/admin');
const Order = require('../models/order');
const { Product }= require("../models/product");

//add product
adminRouter.post('/admin/add-product',admin,async(req,res) =>{
    try {
        //the below should exactly match with the user.dart variables
        const {name,description,images,quantity,price,category} = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category
        });
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({error : e.message + 'error here '});
    }
});

//get all your products
adminRouter.get('/admin/get-products',admin ,async(req,res) =>{
    try {
        const products = await Product.find({});
        res.json(products);
        console.log('fetching fetching');
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});
adminRouter.post('/admin/delete-product',admin,async(req,res) => {
    try {
        const {id} = req.body
        let product = await Product.findByIdAndDelete(id);
        res.json(product); // this line is for formality
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});
adminRouter.get('/admin/get-orders',admin,async(req,res)=>{
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})
adminRouter.post("/admin/change-order-status",admin,async(req,res) => {
    try {
        const {id,status} = req.body;
        let order = await Order.findById(id);
        order.status = status;
        order = await order.save();
        res.json(order);

    } catch (error) {
        res.status(500).json({error : error.message})
    }
});
adminRouter.get("/admin/analytics",admin,async(req,res)=>{
    try {
        let totalEarnings = 0;
        const orders = Order.findById({});
        for(let i = 0; i < orders.length(); i++){
            for(let j = 0; j < orders[i].products.length; j++){
                totalEarnings += orders[i].products[j].quantity*orders[i].products[j].price
            }
        }
        //Category Wise fetching
        let mobileEarnings = await fetchCategoryWiseProducts('Mobiles');
        let essentialEarnings = await fetchCategoryWiseProducts('Essential');
        let booksEarnings = await fetchCategoryWiseProducts('Books');
        let fashionEarnings = await fetchCategoryWiseProducts('Fashion');
        let appliancesEarnings = await fetchCategoryWiseProducts('Appliances');
    } catch (error) {
        res.status(500).json({error : error.message})
    }
});
async function fetchCategoryWiseProducts(category){
    let earnings = 0;
    let categoryOrders = await Order.find({
        'products.product.category' : category,
    });
    for(let i = 0; i < categoryOrders.length(); i++){
        for(let j = 0; j < categoryOrders[i].products.length; j++){
            earnings += categoryOrders[i].products[j].quantity*categoryOrders[i].products[j].price
        }
    }
    return earnings
}



module.exports = adminRouter;