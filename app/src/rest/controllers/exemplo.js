const ExemploService = require("../../business/services/exemplo");

class ExemploController {
  constructor () {
    this.exemploService = new ExemploService();
  }

  async controllerGet (req, res, next) {
    const params = {
      id: req.params.id
    };

    const resultServiceGet = await this.exemploService.serviceGet(params);

    res.json(resultServiceGet);
  }

  async controllerPost (req, res, next) {
    const params = {
      param: req.body.param,
      usuario: req.userTokenDecoded.Usuario
    };

    const resultServicePost = await this.exemploService.servicePost(params);

    res.status(201).json(resultServicePost);
  }

  async controllerPostMongo (req, res, next) {
    const params = {
      param: req.body
    };
    console.log("controllerPostMongo", req.body);
    const resultServicePostMongo = await this.exemploService.servicePostMongo(params);

    res.status(201).json(resultServicePostMongo);
  }
}

module.exports = ExemploController;
