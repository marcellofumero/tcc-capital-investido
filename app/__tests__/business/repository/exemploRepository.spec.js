const ExemploRepository = require("../../../src/business/repository/exemplo");
const exemploRepository = new ExemploRepository();

describe("ExemploRepository", () => {
  describe("- SUCESS CASES -", () => {
    it("repositoryGet | Caso de sucesso ao retornar a busca", async () => {
      // Parâmetros
      const params = {
        id: 1
      };

      // Mocks
      const returnExecuteQuery = { recordset: [{ id: 1, param: "exemplo" }] };

      const returnExecuteQueryMock = () => returnExecuteQuery;

      jest.spyOn(
        exemploRepository,
        "executeQuery")
        .mockImplementationOnce(returnExecuteQueryMock);

      // End Mocks

      const resultConsulta = await exemploRepository.repositoryGet(params);

      expect(resultConsulta).toBe(returnExecuteQuery.recordset);
    });
    it("repositoryPost | Caso de sucesso ao adicionar exemplo", async () => {
      // Parâmetros
      const params = {
        param: "exemplo",
        usuario: "m.fumero"
      };

      // Mocks
      const returnExecuteQuery = { rowsAffected: [1] };

      const returnExecuteQueryMock = () => returnExecuteQuery;

      jest.spyOn(
        exemploRepository,
        "executeQuery")
        .mockImplementationOnce(returnExecuteQueryMock);

      // End Mocks

      const resultConsulta = await exemploRepository.repositoryPost(params);

      expect(resultConsulta).toBe(returnExecuteQuery.rowsAffected[0]);
    });
  });
});
