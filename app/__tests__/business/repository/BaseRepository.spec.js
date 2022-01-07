const BaseRepository = require("../../../src/business/repository/baseRepository");
const baseRepository = new BaseRepository();

describe("BaseRepository", () => {
  describe("- SUCESS CASES -", () => {
    it("executeQuery | Caso de sucesso ao tentar executar o comando da query", async () => {
      // Parâmetros
      const params = { methodName: "selectExemplo", diretorio: "exemplo", params: { id: 1 }, query: "select" };

      // Mocks
      const returnExecuteQuery = { recordset: [{ id: 1, param: "exemplo" }] };
      const returnExecuteQueryMock = () => returnExecuteQuery;

      jest.spyOn(
        baseRepository.execDatabase,
        "executeQuery")
        .mockImplementationOnce(returnExecuteQueryMock);
      // End Mocks

      const queryResponse = await baseRepository.executeQuery(params);

      expect(queryResponse).toBe(returnExecuteQuery);
    });
    it("executeQuery | Caso de sucesso ao tentar retornar a string de sql", async () => {
      // Parâmetros
      const params = { methodName: "selectExemplo", diretorio: "exemplo", params: { id: 1 } };

      // Mocks
      const returnStringSql = "select";
      const returnExecuteQuery = { recordset: [{ id: 1, param: "exemplo" }] };
      const returnStringSqlMock = () => returnStringSql;
      const returnExecuteQueryMock = () => returnExecuteQuery;

      jest.spyOn(
        baseRepository,
        "returnStringSql")
        .mockImplementationOnce(returnStringSqlMock);

      jest.spyOn(
        baseRepository.execDatabase,
        "executeQuery")
        .mockImplementationOnce(returnExecuteQueryMock);
      // End Mocks

      const queryResponse = await baseRepository.executeQuery(params);

      expect(queryResponse).toBe(returnExecuteQuery);
    });
  });
  describe("- ERROR CASES -", () => {
    it("executeQuery | Caso de erro ao tentar retornar a string de sql", async () => {
      // Parâmetros
      const params = { methodName: "", diretorio: "", params: {} };

      // Mocks
      const returnStringSql = "";
      const returnStringSqlMock = () => returnStringSql;

      jest.spyOn(
        baseRepository,
        "returnStringSql")
        .mockImplementationOnce(returnStringSqlMock);
      // End Mocks

      try {
        await baseRepository.executeQuery(params);
      } catch (error) {
        expect(error.name).toBe("BadRequest");
        expect(error.status).toBe(400);
        expect(error.message).toBe("Nenhum comando sql retornado");
      }
    });
    it("executeQuery | Caso de erro ao tentar executar o comando da query", async () => {
      // Parâmetros
      const params = { methodName: "selectExemplo", diretorio: "exemplo", params: {}, query: "select" };

      // Mocks
      const returnExecuteQuery = "";
      const returnExecuteQueryMock = () => returnExecuteQuery;

      jest.spyOn(
        baseRepository.execDatabase,
        "executeQuery")
        .mockImplementationOnce(returnExecuteQueryMock);
      // End Mocks

      try {
        await baseRepository.executeQuery(params);
      } catch (error) {
        expect(error.name).toBe("BadRequest");
        expect(error.status).toBe(400);
        expect(error.message).toBe("Erro ao executar query");
      }
    });
  });
});
