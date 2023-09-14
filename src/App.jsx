import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Notes from "./pages/notes/Notes";
import CreateNote from "./pages/create/CreateNote";
import EditNote from "./pages/edit/EditNote";
import NoteDetails from "./pages/notes/noteDetails/NoteDetails";

function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes path="/">
          <Route index element={<Notes />} />
          <Route path="new" element={<CreateNote />} />
          <Route path="notes/:id" element={<NoteDetails />} />
          <Route path="notes/:id/edit" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
