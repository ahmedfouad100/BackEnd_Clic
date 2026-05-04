const Category = require("../models/categories.model");

exports.getAllCategories = async (req, res,next) => {
    try {
        const allCategories = await Category.find();
        return res.status(200).json({ Message: "All categories", allCategories });
    } catch (error) {
        next(error);
    }
}

exports.getCategoryById = async (req, res,next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) { return res.status(404).json({ Message: "catrgory is not found" })}

        return res.status(200).json({ Message: "Category: ", category } )
    } catch (error) {
       next(error);

    }
}

exports.createCategory = async (req, res,next) => {
    try {
        const category = new Category(req.body);
        const newCategory = await category.save();

        return res.status(201).json({Message:"Category is created successfully",newCategory});
    } catch (error) {
        next(error);
    }
}

exports.updateCategoryById = async (req, res,next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (!updatedCategory) { return res.status(404).json({ Message: "category is not found" })}

        return res.status(201).json({ Message: "category is updated", updatedCategory })
    } catch (error) {
      next(error);

    }
}

exports.deleteCategoryById = async (req, res,next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) { return res.status(404).json({ Message: "category is not found" }) }

    return res.status(200).json({Message:"Category is deleted"})
    } catch (error) {
        next(error);
    }
}