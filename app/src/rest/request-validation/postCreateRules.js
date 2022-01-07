const Joi = require("joi");

const postCreateRuleSchema = Joi.object({
  param: Joi.string().required()
});
module.exports = { postCreateRuleSchema };
