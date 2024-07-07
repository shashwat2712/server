const mongoose = require('mongoose');
const { productSchema } = require('./product');
const userSchema = mongoose.Schema({
     name : {
        required : true,
        type : String,
        trim : true
     },
     email : {
        required : true,
        type : String,
        trim : true,
        validate : {
            validator : (value) =>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message : 'Please enter a valid email address',

        }
     },
     password : {
        required : true,
        type : String,
     },
     address:{
        type : String,
        default: '',
     },
     type : {
        type : String,
        default : 'user',
     },
     cart : [
      {
         product : productSchema,
         quantity : {
            type : Number,
            required : true,
         }
      },
     ]

})
//making a model as above is not a model but just a schema
//Model: A constructor compiled from a schema. An instance of a model is called
// a document. Models are responsible for creating and
// reading documents from the underlying MongoDB database.
//Schema: Defines the structure and rules for the data (like fields, types, validation).
//Model: A compiled version of the schema that acts as a constructor for creating and querying documents.
const User = mongoose.model("User",userSchema);
module.exports = User;