import React, { useState, useContext, useEffect } from "react";
import "./noteDetails.css";
import {
  RiArrowGoBackFill,
  RiDeleteBin2Fill,
  RiPencilFill,
} from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import noteContext from "../../../context/note-context";

const NoteDetails = () => {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [note, setNote] = useState();

  const context = useContext(noteContext);
  const params = useParams();

  useEffect(() => {
    const { title, date, note } = context.notesArray.find(
      (note) => note.id === params.id
    );
    setTitle(title);
    setDate(date);
    setNote(note);
  }, [params.id]);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
      context.deleteNote(params.id);
      setTitle("");
      setDate("");
      setNote("");
    }
  });

  return (
    <section className="note__details">
      <div className="note__details-container container">
        <header className="note__details-header">
          <Link className="btn" to="..">
            <RiArrowGoBackFill className="btn-child" />
          </Link>

          <div className="note__details-actions">
            <Link
              to="/"
              className="btn"
              onClick={() => context.deleteNote(params.id)}
            >
              Delete <RiDeleteBin2Fill className="btn-child" />
            </Link>

            <Link className="btn" to='edit'>
              Edit <RiPencilFill className="btn-child" />
            </Link>
          </div>
        </header>

        <div className="note__details-details">
          <h3 className="note__details-title">{title}</h3>
          <h5 className="note__details-date">{date}</h5>
          <p className="note__details-note">{note}</p>
        </div>
      </div>
    </section>
  );
};

export default NoteDetails;
