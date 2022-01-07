"use stric";
const mongoose = require("mongoose");
const config = require("../config/index");

class MongoosePool {
  constructor () {
    this.config = config.mongodbConfig;
  }

  startConnection () {
    const url = this.resolvepath();
    console.log("startConnection", this.url);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected")).catch(e => console.log(e));
    return mongoose;
  }

  resolvepath (config) {
    // FIXME
    const url = `mongodb://127.0.0.1/capitalinvestido`;
    return url;
  }
}

module.exports = MongoosePool;
