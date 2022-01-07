const { MongoClient } = require("mongodb");

class MongoConnection {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}

  static instance () {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  }

  async connect () {
    const mongoClient = new MongoClient("mongodb://127.0.0.1/capitalinvestido", { useNewUrlParser: true, useUnifiedTopology: true });
    this.client = await mongoClient.connect();
  }

  async getCollection (name) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect();
    }
    return this.client.db("capitalinvestido").collection(name);
  }

  async close () {
    if (!this.client || !this.client.isConnected()) {
      await this.client.close();
      this.client = null;
    }
  }
}

MongoConnection.client = null;
MongoConnection._instance = null;

module.exports = MongoConnection;
