const { idSchema } = require("./idSchema");
const { postCreateRuleSchema } = require("./postCreateRules");

const { bodyValidateRequest, paramValidateRequest } = require("../middlewares/validationMiddleware");

module.exports = {
  idSchema: (req, res, next) =>
    paramValidateRequest(req, res, next, idSchema),
  postCreateRule: (req, res, next) =>
    bodyValidateRequest(req, res, next, postCreateRuleSchema)
};
