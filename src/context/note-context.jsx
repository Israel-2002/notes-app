import React from "react";

const noteContext = React.createContext({
  notesArray: [],
  addNote: () => {},
  deleteNote: () => {},
});

export default noteContext;
