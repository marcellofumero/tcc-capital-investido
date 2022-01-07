const { BadRequest, errorCallback } = require("../common/exceptionHandler");
const config = require("../config/index");
class ExecDatabase {
  constructor () {
    this.sql = require("mssql");
    this.types = require("mssql").TYPES;
    this.process = require("process");
    this.pid = process.pid;
    this.ControleId = 0;
    this.config = config.database;
  }

  async executeQuery (SqlQuery, parameters) {
    try {
      const pool = new this.sql.ConnectionPool(this.config);
      await pool.connect();

      pool.on("error", (error) => errorCallback(`Erro no pool de conexão: ${error.message}`, error));

      let request = await pool.request();

      if (parameters) {
        for (const parameter in parameters) {
          // eslint-disable-next-line no-prototype-builtins
          if (parameters.hasOwnProperty(parameter)) {
            let key = parameter;
            const value = parameters[parameter];
            let type = this.sql.VarChar;
            if (value) {
              if (key.indexOf("str") !== 0) {
                if (!isNaN(value)) {
                  if (!Number.isInteger(parseFloat(value))) {
                    type = this.sql.Float;
                  } else {
                    type = this.sql.Int;
                  }
                } else {
                  if (value.split("-").length === 3 && !isNaN(value.toString().replace(/-/g, ""))
                  ) {
                    type = this.sql.Date;
                  }
                }
              } else {
                key = key.replace("str", "");
              }
            }
            key = key.replace("str", "");
            request = await request.input(key, type, value);
          }
        }
      }

      const result = await request.query(SqlQuery);
      pool.close();
      return result;
    } catch (error) {
      const msg = `Database: ExecDatabase || Method: executeQuery || ${error.message}`;
      console.error(
        msg
      );
      throw new BadRequest(msg, {
        ...error.stack
      });
    }
  }
}

module.exports = ExecDatabase;
