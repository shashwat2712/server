const mongoose = require('mongoose');
const {productSchema} = require('./product')

const topTrendingSchema = mongoose.Schema({
    avgRating : {
        required : true,
        type : Number
    },
    product : {
        type : productSchema,
        required : true
    }
});
const topTrending = mongoose.model('TopTrending',topTrendingSchema)
module.exports = topTrending;
