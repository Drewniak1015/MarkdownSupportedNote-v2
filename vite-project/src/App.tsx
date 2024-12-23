import React, { useEffect, useState } from "react";
import Notes from "./Components/Notes";
import { Routes, Route } from "react-router-dom";
import NewNote from "./Components/NewNote";
import { v5 as uuidv5 } from "uuid";
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

  let [NotesList, SetNotesList] = useState<Note[]>([
    {
      Title: "cos",
      Body: "cos",
      Tags: ["cos", "cos", "cos2"],
      id: "1",
    },
    {
      Title: "cos3",
      Body: "cos3",
      Tags: ["cos3", "cos3", "cos3"],
      id: "2",
    },
  ]);

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
    <div className="w-[80vw]  h-[100vh] mx-auto p-8">
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
          path="/New"
          element={
            <NewNote
              DefaultOptions={DefaultOptions}
              setDefaultOptions={setDefaultOptions}
              SetNotesList={SetNotesList}
              NotesList={NotesList}
            ></NewNote>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
//zrobic style matcuhje do drugiego inputa
