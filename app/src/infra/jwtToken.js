const jwt = require("jsonwebtoken");
const sessionConfig = require("../config/auth/session.json");

class JwtToken {
  async generate (params) {
    try {
      return jwt.sign({ params }, sessionConfig.secret, {
        expiresIn: sessionConfig.expires
      });
    } catch (error) {
      throw new Error(`Generate token failed: ${error.message}`);
    }
  }

  async decode (token) {
    try {
      return jwt.verify(token, sessionConfig.secret, (error, decoded) => {
        if (error) {
          throw new Error(`Token invalid: ${error.message}`);
        }
        return { tokenDecoded: decoded };
      });
    } catch (error) {
      throw new Error(`Decoded token failed ${error.message}`);
    }
  }
}

module.exports = new JwtToken();
