const mongoose = require('mongoose');// Ensure this is the correct path

const recommendationSchema = new mongoose.Schema({
    recommendation : [],
    recommendations : [],
});

const Recommendations = mongoose.model('recommendations', recommendationSchema);
module.exports = Recommendations;