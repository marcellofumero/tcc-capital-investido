const express = require("express");
const cors = require("cors");

const recursiveReaddir = require("recursive-readdir");

const path = require("path");

// Documentação enpoints
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load(path.resolve().concat("/docs/swagger/endpoints.yaml"));

// Autenticação
// const authMiddleware = require("./rest/middlewares/authMiddleware");

class App {
  constructor () {
    this.server = express();
    this.server.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.server.use(express.json());
    // this.server.use(authMiddleware);
  }

  routes () {
    this.server.use(
      "/endpoints",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    const pathTest = path.resolve(
      path.resolve("./").concat("/coverage/lcov-report")
    );

    this.server.use("/test", express.static(pathTest));

    const pathFiles = path.resolve(
      path.resolve("./").concat("/src/rest/routes")
    );

    recursiveReaddir(pathFiles, ["!*.js"], (error, files) => {
      if (error) {
        console.error(
          `Src: app || Method: routes || ErrorMessage: Error to importing routes: ${error}`
        );
        process.exit(1);
      }

      files.forEach((element) => {
        const route = require(element);
        this.server.use(route);
      });
    });
  }
}

module.exports = new App().server;
