const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.number().integer()
});
module.exports = { idSchema };
