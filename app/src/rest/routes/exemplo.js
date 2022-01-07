const { Router } = require("express");
const routes = Router();

// schema validation
const { idSchema, postCreateRule } = require("../request-validation/request-validation");

const ExemploController = require("../controllers/exemplo");
const exemploController = new ExemploController();

routes.get("/exemplo/:id", idSchema, (req, res, next) => {
  exemploController.controllerGet(req, res, next);
});

routes.post("/exemplo", postCreateRule, (req, res, next) => {
  exemploController.controllerPost(req, res, next);
});

routes.post("/exemplo/mongo", (req, res, next) => {
  exemploController.controllerPostMongo(req, res, next);
});

module.exports = routes;
