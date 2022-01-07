require("../../mocks/exemploRepositoryMock");

const ExemploService = require("../../../src/business/services/exemplo");
const exemploService = new ExemploService();

describe("exemploService", () => {
  describe("- SUCESS CASES -", () => {
    it("serviceGet | Caso de sucesso ao returnar a busca", async () => {
      // Parâmetros
      const params = {
        id: 1
      };

      // Mocks
      const returnRepositoryGet = [{ id: 1, param: "exemplo" }];

      const returnRepositoryGetMock = () => returnRepositoryGet;

      jest.spyOn(
        exemploService.exemploRepository,
        "repositoryGet")
        .mockImplementationOnce(returnRepositoryGetMock);

      // End Mocks

      const resultRepositoryGet = await exemploService.serviceGet(params);

      expect(resultRepositoryGet).toBe(returnRepositoryGet);
    });
    it("servicePost | Caso de sucesso ao adicionar exemplo", async () => {
      // Parâmetros
      const params = {
        param: "exemplo",
        usuario: "m.fumero"
      };

      // Mocks
      const returnRepositoryPost = 1;

      const returnRepositoryPostMock = () => returnRepositoryPost;

      jest.spyOn(
        exemploService.exemploRepository,
        "repositoryPost")
        .mockImplementationOnce(returnRepositoryPostMock);

      // End Mocks

      const resultRepositoryPost = await exemploService.servicePost(params);

      expect(resultRepositoryPost.status).toBe(201);
      expect(resultRepositoryPost.response).toBe("Dados gravados com sucesso!");
    });
  });
  describe("- ERROR CASES -", () => {
    it("serviceGet | Caso de erro ao retornar a busca", async () => {
      // Parâmetros
      const params = {
        id: 1
      };

      // Mocks
      const returnRepositoryGet = [];

      const returnRepositoryGetMock = () => returnRepositoryGet;

      jest.spyOn(
        exemploService.exemploRepository,
        "repositoryGet")
        .mockImplementationOnce(returnRepositoryGetMock);

      // End Mocks
      try {
        await exemploService.serviceGet(params);
      } catch (error) {
        expect(error.name).toBe("NotFoundError");
        expect(error.status).toBe(404);
        expect(error.message).toBe("Nenhum retorno encontrado.");
      }
    });

    it("servicePost | Caso de erro ao returnar a busca", async () => {
      // Parâmetros
      const params = {
        param: "exemplo",
        usuario: "m.fumero"
      };

      // Mocks
      const returnRepositoryPost = 0;

      const returnRepositoryPostMock = () => returnRepositoryPost;

      jest.spyOn(
        exemploService.exemploRepository,
        "repositoryPost")
        .mockImplementationOnce(returnRepositoryPostMock);

      // End Mocks
      try {
        await exemploService.servicePost(params);
      } catch (error) {
        expect(error.name).toBe("BadRequest");
        expect(error.status).toBe(400);
        expect(error.message).toBe("Nenhum registro foi feito.");
      }
    });
  });
});
