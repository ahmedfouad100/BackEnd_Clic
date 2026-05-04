const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    description:{type:String},
},{timestamps:true});

const Category = mongoose.model("Category",categoriesSchema);
module.exports = Category;



