const Product = require("../models/products.models");

exports.getAllProducts = async (req, res,next) => {
    try {
        const allProducts = await Product.find().populate("categoryId", "name").populate("createdBy", "name email");

        return res.status(200).json({ Message: "All products: ", allProducts });
    } catch (error) {
       next(error);
    }
};

exports.getProductById = async (req, res,next) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId", "name").populate("createdBy", "name email");
        if (!product) { return res.status(404).json({ Message: "Product is not found" }) }

        return res.status(200).json({ Message: "Product: ", product });
    } catch (error) {
       next(error);

    }
};

exports.createProduct = async (req, res,next) => {
    try {
        req.body.createdBy = req.userInfo.id;
        const newProduct = new Product(req.body);
        await newProduct.save();

        return res.status(201).json({ Message: "product is created successfully", newProduct });
    } catch (error) {
        next(error);
    }
};


exports.updateProduct = async(req,res,next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        );
        if(!updatedProduct){ return res.status(404).json({Message:"product not found"})}
        res.status(201).json({Message:"Product is updated succefully"})
    } catch(error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res,next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) { return res.status(404).json({ Message: "Product is not found" })}

        return res.status(200).json({ Message: "Product is deleted successfully" });
    } catch (error) {
        next(error);
    }
}

exports.uploadProductImage = async (req, res,next) => {
    try {
        if (!req.file) { return res.status(400).json({ Message: "Please upload an image file" }) }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { image: req.file.path },
            { new: true }
        );
        if (!updatedProduct) { return res.status(404).json({ Message: "Product not found" })}
        
        return res.status(200).json({
            Message: "Image uploaded successfully",
            imageName: req.file.path,
            product: updatedProduct
        });

    } catch (error) {
        next(error);
    }
};