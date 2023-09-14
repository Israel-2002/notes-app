import React, { useState, useContext, useEffect } from "react";
import { RiSearchFill, RiCloseLine, RiAddLine } from "react-icons/ri";
import "./notes.css";
import { Link } from "react-router-dom";
import Note from "../../components/Note";
import noteContext from "../../context/note-context";

const Notes = () => {
  const [search, setSearch] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [dynamicNotes, setDynamicNotes] = useState([]);

  const context = useContext(noteContext);

  const showSearchHandler = () => setDisplaySearch(true);
  const hideSearchHandler = () => setDisplaySearch(false);

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setDynamicNotes(context.notesArray);
      return;
    }

    const filteredNotes = context.notesArray.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    setDynamicNotes(filteredNotes);
  }, [search]);

  const displayNotes = (
    <ul className="notes__list">
      {dynamicNotes.map((note) => (
        <Link key={note.id} to={`notes/${note.id}`}>
          <Note title={note.title} note={note.note} date={note.date} />
        </Link>
      ))}
    </ul>
  );

  let displayContent = (
    <p className="notes__new">
      Click on the plus icon below to create your first note.
    </p>
  );

  if (context.notesArray.length > 0) {
    displayContent = displayNotes;
  }

  if (search.trim() !== "" && dynamicNotes.length === 0) {
    displayContent = <p className="notes__new">Note not found</p>;
  }
  return (
    <section className="notes">
      <div className="notes__container container">
        <header className="notes__header">
          {!displaySearch && (
            <div className="notes__header-default">
              <h2 className="notes__title">My Notes</h2>
              <button className="btn">
                <RiSearchFill
                  className="btn-child"
                  onClick={showSearchHandler}
                />
              </button>
            </div>
          )}

          {displaySearch && (
            <div className="notes__header-search">
              <input
                className="notes__search"
                type="search"
                name=""
                id=""
                autoFocus
                value={search}
                onChange={searchChangeHandler}
              />
              <button className="btn">
                <RiCloseLine
                  className="btn-child"
                  onClick={hideSearchHandler}
                />
              </button>
            </div>
          )}
        </header>

        {displayContent}

        <Link className="btn btn-add" to="../new">
          <RiAddLine className="btn-child" color="#222121" />
        </Link>
      </div>
    </section>
  );
};

export default Notes;
