const express = require("express");
const router = express.Router();
const {valid} = require("../middlewares/validation.middleware")
const {registerValidator,loginValidator} = require("../validation/user.validation");
const userController = require("../controllers/user.controller");

router.get('/',userController.getAllusers);
router.post('/register',valid(registerValidator),userController.register);
router.post('/login',valid(loginValidator),userController.login);

module.exports = router;
