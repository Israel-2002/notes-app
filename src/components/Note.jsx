import React from "react";
import "./note.css";

const Note = ({ title, note, date }) => {

  const dynamicTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title
  const dynamicNote = note.length > 100 ? `${note.substring(0, 100)}...` : note;

  return (
    <li className="note">
      <h3 className="note__title">{dynamicTitle}</h3>
      <p className="note__note">{dynamicNote}</p>
      <p className="note__date">{date}</p>
    </li>
  );
};

export default Note;
