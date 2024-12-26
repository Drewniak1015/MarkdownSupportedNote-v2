import { useEffect } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
interface Tag {
  label: string;
  value: string;
  id: string;
}
interface Note {
  Title: string;
  Body: string;
  Tags: string[];
  id: string;
}
interface NoteProps {
  Title: string;
  Body: string;
  Tags: string[];
  id: string;
}
interface NoteListProps {
  DefaultOptions: Tag[];
  SetNotesList: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  NotesList: Note[];
}
const Note: React.FC<NoteListProps> = ({
  DefaultOptions,
  NotesList,
  SetNotesList,
}) => {
  const location = useLocation();
  const { note } = (location.state as { note: Note }) || {};
  const navigate = useNavigate();

  if (!note) {
    return <p>No note selected.</p>;
  }
  useEffect(() => {
    localStorage.setItem("NoteList", JSON.stringify(NotesList));
  }, [NotesList]);
  return (
    <div className="p-8">
      {" "}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-8">{note.Title}</h1>
        <div>
          <Link to="/Edit" state={{ note: note }} key={note.id}>
            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300">
              {" "}
              Edit
            </button>
          </Link>{" "}
          {/* <Link to="/"> */}
          <button
            className="text-red-600 border-red-700 border-2 hover:text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none red:focus:ring-blue-800 duration-300"
            id={note.id}
            onClick={(e: any) => {
              let NewList = NotesList.filter((opt) => opt.id !== e.target.id);

              SetNotesList(NewList);

              navigate("/");
              //  set dla notelista
              // przekazac props dla set i wrzucic na localstroage
            }}
          >
            {" "}
            Delete Note
          </button>
          {/* </Link>{" "} */}
          <Link to="/">
            <button className=" hover:bg-gray-700 hover:text-white border-2 border-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 duration-300">
              {" "}
              Back to Notes
            </button>
          </Link>
        </div>
      </div>
      <p className="text-2xl text-gray-700 mb-8">{note.Body}</p>
      <div className="flex gap-2">
        {note.Tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold"
          >
            {DefaultOptions.map((option) =>
              option.id == tag && option.label !== "" ? option.label : ""
            )}
          </span>
        ))}
      </div>{" "}
    </div>
  );
};

export default Note;
// przekazac tutaj notelist i filtrowac note return i localstorage save
//serach po tagach dodac debug i react-router paramsy