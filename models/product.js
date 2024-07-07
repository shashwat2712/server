const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,   
        trim : true
    },
    images: [
        {
            type : String,
            required : true,
        }
    ],
    quantity : {
        type : Number,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
    },
    brand : {
        type : String,
        required : false
    },
    discounted_price : {
        type : Number,
        required : false
    },
    uniq_id : {
        type : String,
        required : false
    },
    // userId : {
    //     assuming that we will be the sole admin so no need of this field

    // }
    ratings:[
        ratingSchema
    ]
});

const Product = mongoose.model('Product',productSchema);
module.exports = { Product, productSchema };
