import React, { useState, useContext } from "react";
import "./createNote.css";
import { RiArrowGoBackFill, RiBook2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import noteContext from "../../context/note-context";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const context = useContext(noteContext);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const noteChangeHandler = (event) => {
    setNote(event.target.value);
  };

  const getDateHandler = () => {
    const today = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(today);

    return formattedDate;
  };

  const submitHandler = (event) => {
    event && event.preventDefault();

    if (title.trim() === "" || note.trim() === "") return;

    const id = crypto.randomUUID();

    context.addNote({ id, title, note, date: getDateHandler() });

    setTitle("");
    setNote("");
  };

  return (
    <section className="create">
      <div className="create__container container">
        <form
          className="create__form"
          onSubmit={submitHandler}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitHandler();
          }}
        >
          <header className="create__header">
            <Link className="btn" to="..">
              <RiArrowGoBackFill className="btn-child" />
            </Link>

            <button className="btn btn-save">
              Create Note <RiBook2Fill className="btn-child" />
            </button>
          </header>

          <input
            type="text"
            placeholder="Title"
            autoFocus
            onChange={titleChangeHandler}
            value={title}
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter your note"
            onChange={noteChangeHandler}
            value={note}
          ></textarea>
        </form>
      </div>
    </section>
  );
};

export default CreateNote;
