const jwtToken = require("../../infra/jwtToken");

const {
  formatError,
  UnauthorizedError
} = require("../../common/exceptionHandler");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedError("Tenhum token informado!");

    const tokenDecodedObj = await jwtToken.decode(token);
    req.userTokenDecoded = await tokenDecodedObj.tokenDecoded;
    next();
  } catch (error) {
    if (error) {
      const err = await formatError(error);
      err.status = 401;
      return res.status(err.status)
        .json({ error: `Erro na autentitação:  ${err.description}` });
    }
  }
};
