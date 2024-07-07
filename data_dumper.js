const express = require('express')
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { Product } = require("D:/shashwat sai vyas/AndroidStudioProjects/amazon_clone_node_js_and_flutter/server/models/product.js");

// Define the product schema


const PORT = 8000;
const app = express();
const DB = "mongodb+srv://shashwatsaivyas:9827591825a@cluster0.ecndkbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB).then(() => {
    console.log('Connection Successful')
    insertFromCsv()
}).catch((e)=>{
    console.log(e);
})



// Function to insert data into the database


// Specify the location of your CSV file
function insertFromCsv(){
  const csvFilePath = 'D:\\shashwat sai vyas\\yo\\sample.csv';
  const products = [];
  // Read and parse the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const images = JSON.parse(row.image); // Parse the image field to an array
      const product = {
          name: row.product_name,
          description: row.description,
          images: images,
          quantity: 100, // You can adjust this based on your data
          price: row.retail_price,
          discounted_price: row.discounted_price,
          category: row.first_category,
          brand: row.brand,
          uniq_id : row.uniq_id,
          ratings: [] // Set ratings to be an empty array
      };
      products.push(product);
    })
    .on('end', () => {
      Product.insertMany(products)
      console.log('CSV file successfully processed'); // Close the connection once processing is done
    });
}
