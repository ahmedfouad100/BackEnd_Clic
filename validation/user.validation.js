const joi = require("joi");
exports.registerValidator = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().lowercase().email().required(),
    password: joi.string(),
    role: joi.string().valid("admin", "user"),
})

exports.loginValidator = joi.object({
    email: joi.string().lowercase().email().required(),
    password: joi.string(),
})