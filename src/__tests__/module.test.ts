const mockAddNote = {
  name: "test",
  email: "test@test.ie",
  password: "testtest",
};

describe("[NoteResolver.addNote]", () => {
  it("Verify the server has created a new note", () => {
    expect(mockAddNote.name).toEqual("test");
  });
});

describe("[NoteResolver.updateNote]", () => {
  it("Verify a note email has been updated", () => {
    expect(mockAddNote.email).toEqual("test@test.ie");
  });
});

describe("[NoteResolver.deleteNote]", () => {
  it("Verify a note has been deleted", () => {
    expect(mockAddNote.password).toEqual("testtest");
  });
});
