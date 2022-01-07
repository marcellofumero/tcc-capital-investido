jest.mock("@/business/repository/exemplo.js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      async repositoryGet (params = {}) {},
      async repositoryPost (params = {}) {}
    };
  });
});
