const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    description:{type:String},
    price:{type:Number,required:true},
    image:{type:String},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema);