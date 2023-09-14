import React, { useState, useEffect, useContext } from "react";
import "./editNote.css";
import { RiCheckFill, RiArrowGoBackFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import noteContext from "../../context/note-context";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const params = useParams();
  const context = useContext(noteContext);

  useEffect(() => {
    const { title, note } = context.notesArray.find(
      (note) => note.id === params.id
    );
    setTitle(title);
    setNote(note);
  }, [params.id]);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const noteChangeHandler = (event) => setNote(event.target.value);

  const submitHandler = (event) => {
    event && event.preventDefault();
    if (title.trim() === "" || note.trim() === "") return;

    context.addNote({ id: params.id, title: title, note: note });

    localStorage.setItem("APP_STATE", JSON.stringify(context.notesArray));

    setTitle("");
    setNote("");
  };

  return (
    <section className="edit">
      <div className="edit__container container">
        <form
          className="edit__form"
          onSubmit={submitHandler}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitHandler();
          }}
        >
          <header className="edit__header">
            <Link className="btn" to="..">
              <RiArrowGoBackFill className="btn-child" />
            </Link>

            <button className="btn btn-save">
              Save <RiCheckFill className="btn-child" />
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

export default EditNote;
