import { useEffect, useState } from "react";
import Notes from "./Components/Notes";
import { Routes, Route } from "react-router-dom";
import NewNote from "./Components/NewNote";
import Note from "./Components/Note";
import EditNote from "./Components/EditNote";
const App = () => {
  interface Note {
    Title: string;
    Body: string;
    Tags: string[];
    id: string;
  }
  useEffect(() => {
    let ItemFromStorage = localStorage.getItem("NoteList");
    if (ItemFromStorage) {
      let ParsedItem = JSON.parse(ItemFromStorage);
      SetNotesList(ParsedItem);
    }
  }, []);

  let [NotesList, SetNotesList] = useState<Note[]>([]);

  interface Tag {
    label: string;
    value: string;
    id: string;
  }

  useEffect(() => {
    let ItemFromStorage = localStorage.getItem("Tags");
    if (ItemFromStorage) {
      let ParsedItem = JSON.parse(ItemFromStorage);
      setDefaultOptions(ParsedItem);
    }
  }, []);

  let [DefaultOptions, setDefaultOptions] = useState<Tag[]>([]);
  return (
    <div className="w-[100vw] sm:w-[85vw]  h-[100vh] mx-auto p-8">
      <Routes>
        <Route
          path="/"
          element={
            <Notes
              NotesList={NotesList}
              DefaultOptions={DefaultOptions}
              setDefaultOptions={setDefaultOptions}
            ></Notes>
          }
        ></Route>
        <Route
          path="New"
          element={
            <NewNote
              DefaultOptions={DefaultOptions}
              setDefaultOptions={setDefaultOptions}
              SetNotesList={SetNotesList}
            ></NewNote>
          }
        ></Route>
        <Route
          path="DYNAMICSEND"
          element={
            <Note
              DefaultOptions={DefaultOptions}
              NotesList={NotesList}
              SetNotesList={SetNotesList}
            ></Note>
          }
        ></Route>
        <Route
          path="Edit"
          element={
            <EditNote
              DefaultOptions={DefaultOptions}
              setDefaultOptions={setDefaultOptions}
              SetNotesList={SetNotesList}
              NotesList={NotesList}
            ></EditNote>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
