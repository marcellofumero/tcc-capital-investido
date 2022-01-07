const config = {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    requestTimeout: 300000,
    connectionTimeout: 300000,
    options: { encrypt: false },
    pool: {
      idleTimeoutMillis: 300000,
      max: 100
    }
  },
  mongodbConfig: {
    host: process.env.MONGO_DB_URL,
    port: process.env.MONGO_DB_PORT,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
    db: process.env.MONGO_DB_NAME
  }
};

module.exports = config;
