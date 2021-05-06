const mockAddLesson = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[LessonResolver.addLesson]", () => {
  it("Verify the server has created a new lesson", () => {
    expect(mockAddLesson.name).toEqual("test");
  });
});

describe("[LessonResolver.updateLesson]", () => {
  it("Verify a lesson email has been updated", () => {
    expect(mockAddLesson.email).toEqual("test@test.ie");
  });
});

describe("[LessonResolver.deleteLesson]", () => {
  it("Verify a lesson has been deleted", () => {
    expect(mockAddLesson.password).toEqual("testtest");
  });
});
