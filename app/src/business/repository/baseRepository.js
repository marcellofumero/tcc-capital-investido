const ExecDatabase = require("../../infra/execDatabase");
const { BadRequest } = require("../../common/exceptionHandler");

const SqlCommandsHandler = require("../../common/sqlCommandsHandler");

class BaseRepository extends SqlCommandsHandler {
  constructor () {
    super();
    this.execDatabase = new ExecDatabase();
  }

  async executeQuery ({ methodName, diretorio, params, query }) {
    if (!query) {
      const sqlCommand = await this.returnStringSql({ methodName, moduleName: diretorio });
      if (!sqlCommand) throw new BadRequest(`Nenhum comando sql retornado`, { methodName, diretorio, params, query });
      query = sqlCommand;
    }

    const queryResponse = await this.execDatabase.executeQuery(query, params);

    if (!queryResponse) throw new BadRequest(`Erro ao executar query`, { query });

    return queryResponse;
  }
}

module.exports = BaseRepository;
