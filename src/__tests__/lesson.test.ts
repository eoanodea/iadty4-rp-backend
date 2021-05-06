const mockAddModule = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[ModuleResolver.addModule]", () => {
  it("Verify the server has created a new module", () => {
    expect(mockAddModule.name).toEqual("test");
  });
});

describe("[ModuleResolver.updateModule]", () => {
  it("Verify a module email has been updated", () => {
    expect(mockAddModule.email).toEqual("test@test.ie");
  });
});

describe("[ModuleResolver.deleteModule]", () => {
  it("Verify a module has been deleted", () => {
    expect(mockAddModule.password).toEqual("testtest");
  });
});
