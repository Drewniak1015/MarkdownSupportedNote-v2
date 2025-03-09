import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
interface OptionsProps {
  label: string;
  value: string;
  id: string;
}
interface NoteProps {
  Title: string;
  Body: string;
  Tags: string[];
  id: string;
}
interface NewNotesProps {
  DefaultOptions: OptionsProps[];
  setDefaultOptions: React.Dispatch<React.SetStateAction<OptionsProps[]>>;
  SetNotesList: React.Dispatch<React.SetStateAction<NoteProps[]>>;
}

const NewNote: React.FC<NewNotesProps> = ({
  DefaultOptions,
  setDefaultOptions,
  SetNotesList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [NewNote, SetNewNote] = useState<NoteProps>({
    Title: "",
    Body: "",
    Tags: [],
    id: "",
  });
  const navigate = useNavigate();

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
    id: uuidv4(),
  });

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setDefaultOptions((prev) => {
        const NewValue = [...prev, newOption];
        localStorage.setItem("Tags", JSON.stringify(NewValue));
        return NewValue;
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedNote = { ...NewNote, id: uuidv4() };

    SetNotesList((prev) => {
      const NewValue = [...prev, updatedNote];
      localStorage.setItem("NoteList", JSON.stringify(NewValue));
      return NewValue;
    });

    navigate("/");
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h1 className="text-[3rem] font-normal">New Note</h1>
      <div className="flex gap-4 mt-8 flex-col sm:flex-row">
        <div className="flex flex-col flex-1 basis-0">
          <label htmlFor="title" className="mb-2 font-normal">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            placeholder="Type Here..."
            className="w-full bg-transparent placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-lg shadow-gray-100 focus:ring-2 ring-blue-300"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              SetNewNote((prevNote) => ({
                ...prevNote,
                Title: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col flex-1 basis-0">
          <label htmlFor="tags" className="mb-2 font-normal">
            Tags
          </label>
          <CreatableSelect
            isClearable
            options={DefaultOptions}
            isMulti={true}
            isLoading={isLoading}
            isDisabled={isLoading}
            onCreateOption={handleCreate}
            onChange={(tags: MultiValue<OptionsProps>) => {
              const MainTags = tags.map((tag) => tag.id);
              SetNewNote((prevNote) => ({
                ...prevNote,
                Tags: MainTags,
              }));
            }}
          />
        </div>
      </div>
      <div className="pt-4">
        <label htmlFor="body" className="mb-2 font-normal">
          Body
        </label>
        <textarea
          id="body"
          className="w-full h-[15rem] bg-transparent placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-lg shadow-gray-100 focus:ring-2 ring-blue-300"
          required
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            SetNewNote((prevNote) => ({
              ...prevNote,
              Body: e.target.value,
            }));
          }}
        ></textarea>
      </div>
      <div className="flex justify-end pt-8">
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300"
        >
          Save
        </button>

        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 duration-300"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewNote;
