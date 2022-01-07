const BaseRepository = require("./baserepository");
// const BaseMongo = require("../database/models/logs");
const MongoConnection = require("../../common/connectMongo");

class ExemploRepository extends BaseRepository {
  constructor () {
    super();
    this.sqlFileLocation = "exemplo";
  }

  async repositoryGet (params = {}) {
    const resultConsulta = await this.executeQuery({ methodName: "selectExemplo", diretorio: this.sqlFileLocation, params });

    return resultConsulta.recordset;
  }

  async repositoryPost (params = {}) {
    const resultConsulta = await this.executeQuery({ methodName: "insertExemplo", diretorio: this.sqlFileLocation, params });

    return resultConsulta.rowsAffected[0];
  }

  async repositoryPostMongo (params = {}) {
    console.log("repositoryPostMongo", params.param);
    // const teste = BaseMongo.create(params.param);
    try {
      const collection = await MongoConnection.instance().getCollection("usuarios");
      await collection.insertOne(params.param);
      return { collection };
    } catch (error) {
      return { error };
    }
    // return { teste };
  }
}

module.exports = ExemploRepository;
