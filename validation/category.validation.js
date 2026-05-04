const joi = require("joi");

exports.categorySchema = joi.object({
    name:joi.string().min(3).max(50).trim().required(),
    description:joi.string(),
})