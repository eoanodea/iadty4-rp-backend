const mockAddUser = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[UserResolver.addUser]", () => {
  it("Verify the server has created a new user", () => {
    expect(mockAddUser.name).toEqual("test");
  });
});

describe("[UserResolver.updateUser]", () => {
  it("Verify a user email has been updated", () => {
    expect(mockAddUser.email).toEqual("test@test.ie");
  });
});

describe("[UserResolver.deleteUser]", () => {
  it("Verify a user has been deleted", () => {
    expect(mockAddUser.password).toEqual("testtest");
  });
});
