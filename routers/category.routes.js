const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken.middleware");
const {verifyAdmin} = require("../middlewares/verfiyAdmin.middleware");
const {valid} = require("../middlewares/validation.middleware")
const {categorySchema} = require("../validation/category.validation")
const categoriesController = require("../controllers/category.controller")

router.get('/',verifyToken,categoriesController.getAllCategories);
router.get('/:id',verifyToken,categoriesController.getCategoryById);
router.post('/',verifyToken,verifyAdmin,valid(categorySchema),categoriesController.createCategory);
router.put('/:id',verifyToken,verifyAdmin,valid(categorySchema),categoriesController.updateCategoryById);
router.delete('/:id',verifyToken,verifyAdmin,categoriesController.deleteCategoryById);

module.exports = router;