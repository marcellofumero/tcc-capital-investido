const { BadRequest, NotFoundError } = require("../../common/exceptionHandler");
const ExemploRepository = require("../repository/exemplo");

class ExemploService {
  constructor () {
    this.exemploRepository = new ExemploRepository();
  }

  async serviceGet (params = {}) {
    const resultRepositoryGet = await this.exemploRepository.repositoryGet(params);

    if (resultRepositoryGet.length === 0) { throw new NotFoundError("Nenhum retorno encontrado."); }

    return resultRepositoryGet;
  }

  async servicePost (params = {}) {
    const resultRepositoryPost = await this.exemploRepository.repositoryPost(params);

    if (resultRepositoryPost === 0) { throw new BadRequest("Nenhum registro foi feito."); }

    return { status: 201, response: "Dados gravados com sucesso!" };
  }

  async servicePostMongo (params = {}) {
    console.log("servicePostMongo", params);
    const resultRepositoryPostMongo = await this.exemploRepository.repositoryPostMongo(params);

    if (resultRepositoryPostMongo === 0) { throw new BadRequest("Nenhum registro foi feito."); }

    return { status: 201, response: "Dados gravados com sucesso!" };
  }
}

module.exports = ExemploService;
