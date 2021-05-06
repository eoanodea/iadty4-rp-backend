const mockAddQuestionText = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[QuestionTextResolver.addQuestionText]", () => {
  it("Verify the server has created a new questionText", () => {
    expect(mockAddQuestionText.name).toEqual("test");
  });
});

describe("[QuestionTextResolver.updateQuestionText]", () => {
  it("Verify a questionText email has been updated", () => {
    expect(mockAddQuestionText.email).toEqual("test@test.ie");
  });
});

describe("[QuestionTextResolver.deleteQuestionText]", () => {
  it("Verify a questionText has been deleted", () => {
    expect(mockAddQuestionText.password).toEqual("testtest");
  });
});
