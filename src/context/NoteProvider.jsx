import React, { useEffect, useState } from "react";
import noteContext from "./note-context";

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("APP_STATE")) || []
  );

  useEffect(() => {
    window.localStorage.setItem("APP_STATE", JSON.stringify(notes));
    // console.log('changed');
  }, [notes]);

  const addNoteHandler = (note) => {
    const existingNoteIndex = notes.findIndex((n) => n.id === note.id);
    const existingNote = notes[existingNoteIndex];

    let updatedNotes;

    if (existingNote) {
      updatedNotes = notes;
      updatedNotes[existingNoteIndex] = note;
    } else {
      updatedNotes = [note, ...notes];
    }

    setNotes(updatedNotes);
  };

  const deleteNoteHandler = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  };

  const values = {
    notesArray: notes,
    addNote: addNoteHandler,
    deleteNote: deleteNoteHandler,
  };

  return <noteContext.Provider value={values}>{children}</noteContext.Provider>;
};

export default NoteProvider;
