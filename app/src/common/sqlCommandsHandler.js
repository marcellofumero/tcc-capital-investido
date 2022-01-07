const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const { BadRequest, errorCallback } = require("./exceptionHandler");

class SqlCommandsHandler {
  constructor () {
    this.queriesBasePath = "business/database/queries/";
  }

  async returnStringSql ({ methodName, moduleName }) {
    try {
      const path = await this.resolvePath(moduleName);
      const callbackFileBuffer = (error, buffer) => { if (error) errorCallback("Erro ao ler o arquivo", error); return buffer; };

      const fileBuffer = await readFileAsync(path, (error, buffer) => callbackFileBuffer(error, buffer));
      if (!fileBuffer) {
        errorCallback(`Nenhum arquivo retornado para o caminho:${path}`);
      }
      const fileSql = fileBuffer.toString();
      const regex = new RegExp(`^--#${methodName}#(.*?)^--END#${methodName}#`, "sm");
      const sqlCommandRegex = fileSql.match(regex);
      const sqlCommand = sqlCommandRegex[0]
        .toString()
        .replace(`--#${methodName}#`, "")
        .replace(`--END#${methodName}#`, "");

      return sqlCommand;
    } catch (error) {
      const msgError = `Class: SqlCommandsHandler | Method: returnStringSql ${error.message}`;
      throw new BadRequest(msgError, {
        ...error.stack
      });
    }
  }

  async resolvePath (moduleName) {
    try {
      const path = `./src/${this.queriesBasePath}${moduleName}.sql`;
      return path;
    } catch (error) {
      throw new BadRequest("Erro ao montar o caminho");
    }
  }
}

module.exports = SqlCommandsHandler;
