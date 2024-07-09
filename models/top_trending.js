const mongoose = require('mongoose');
const { productSchema } = require('./product'); // Ensure this is the correct path

const topTrendingSchema = new mongoose.Schema({
    avgRating: {
        required: true,
        type: Number
    },
    product: {
        type: productSchema,
        required: true
    }
});

const TopTrending = mongoose.model('toptrending', topTrendingSchema);
module.exports = TopTrending;
