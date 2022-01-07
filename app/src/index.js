function loadenv () {
  const env = process.env.NODE_ENV.trim();
  if (env === "dev") return ".env.dev";
  else if (env === "hml") return ".env.hml";
  else if (env === "prod") return ".env";
  else return ".env.dev";
}

require("dotenv").config({
  path: loadenv()
});

process.setMaxListeners(Infinity);

const app = require("./app");
app.listen(process.env.PORT);
