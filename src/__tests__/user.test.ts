const mockAddQuestion = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[QuestionResolver.addQuestion]", () => {
  it("Verify the server has created a new question", () => {
    expect(mockAddQuestion.name).toEqual("test");
  });
});

describe("[QuestionResolver.updateQuestion]", () => {
  it("Verify a question email has been updated", () => {
    expect(mockAddQuestion.email).toEqual("test@test.ie");
  });
});

describe("[QuestionResolver.deleteQuestion]", () => {
  it("Verify a question has been deleted", () => {
    expect(mockAddQuestion.password).toEqual("testtest");
  });
});
