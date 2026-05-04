const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken.middleware");
const {verifyAdmin} = require("../middlewares/verfiyAdmin.middleware");
const {valid} = require("../middlewares/validation.middleware")
const { productSchema } = require("../validation/product.validation");
const upload = require("../middlewares/multer.middleware")
const productCont = require("../controllers/product.controller");


router.get('/',productCont.getAllProducts);
router.get('/:id',productCont.getProductById);
router.post('/',verifyToken,verifyAdmin,valid(productSchema),productCont.createProduct);
router.put('/:id',verifyToken,verifyAdmin,valid(productSchema),productCont.updateProduct);
router.delete('/:id',verifyToken,verifyAdmin,productCont.deleteProduct);
router.post('/:id/upload-image', verifyToken, verifyAdmin, upload.single('image'), productCont.uploadProductImage);


module.exports = router;