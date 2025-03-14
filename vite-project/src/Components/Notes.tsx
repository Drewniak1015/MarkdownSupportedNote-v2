import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import { CiSquareRemove } from "react-icons/ci";
interface Note {
  Title: string;
  Body: string;
  Tags: string[];
  id: string;
}

interface OptionsProps {
  value: string;
  label: string;
  id: string;
}
interface NoteListProps {
  NotesList: Note[];
  DefaultOptions: OptionsProps[];
  setDefaultOptions: React.Dispatch<React.SetStateAction<OptionsProps[]>>;
}

const CustomMenu = (props: any) => {
  return (
    <components.Menu {...props}>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 0px",
          borderRadius: "4px",
        }}
      >
        {props.children}
      </div>
    </components.Menu>
  );
};

const Notes: React.FC<NoteListProps> = ({
  NotesList,
  DefaultOptions,
  setDefaultOptions,
}) => {
  const [isOpen, SetIsOpen] = useState<Boolean>(false);
  const [FindTitle, setFindTitle] = useState<string>("");
  const [FilterTags, setFilterTags] = useState<OptionsProps[]>([]);

  const FiltredNotes = NotesList.filter(
    (Note) =>
      Note.Title.toLowerCase().includes(FindTitle?.toLowerCase()) &&
      (FilterTags.length === 0 ||
        FilterTags.every((tag) =>
          Note.Tags.some((noteTag) => noteTag === tag.id)
        ))
  );

  return (
    <div>
      {" "}
      <div
        className={`absolute w-[80vw] top-16 left-1/2 transform -translate-x-1/2 
              sm:left-[calc(50%-15rem)] sm:w-[30rem] sm:top-0 sm:translate-x-0 sm:translate-y-8
              h-auto  bg-white shadow-lg rounded-lg z-50 transition-all duration-300 pb-4 overflow-auto max-h-[30rem] ${
                // without overflow auto?
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 translate-y-[-100px] pointer-events-none"
              }`}
      >
        {/* dodać ikone exitu */}
        <div className="h-35% border-b mb-2">
          <h1 className="text-4xl p-4 font-normal">Edit Tags</h1>
        </div>
        {DefaultOptions.map((elem) => (
          <div className="px-4 py-1 flex gap-4" key={elem.id}>
            <input
              className="w-[90%] bg-transparent placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-lg shadow-gray-100 focus:ring-2 ring-blue-400"
              value={elem.label}
              id={elem.id}
              onChange={(e) => {
                setDefaultOptions((prevOptions) =>
                  prevOptions.map((option) =>
                    option.id == elem.id
                      ? {
                          ...option,
                          label: e.target.value,
                          value: e.target.value,
                        }
                      : option
                  )
                );
                localStorage.setItem("Tags", JSON.stringify(DefaultOptions));
              }}
            ></input>
            <div className="w-[10%]">
              <CiSquareRemove
                className="w-full h-full text-4xl duration-200 cursor-pointer fill-red-500 hover:scale-110"
                onClick={() => {
                  const NewDefaultOptions = DefaultOptions.filter(
                    (opt) => opt.id !== elem.id
                  );
                  setDefaultOptions(NewDefaultOptions);
                  localStorage.setItem(
                    "Tags",
                    JSON.stringify(NewDefaultOptions)
                  );
                }}
              ></CiSquareRemove>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`fixed bg-black  top-0 left-0 w-[100vw] h-[100vh] z-10 transition-all duration-300 transform ${
          isOpen ? "opacity-50" : "opacity-0  pointer-events-none "
        }`}
        onClick={() => {
          SetIsOpen(!isOpen);
        }}
      ></div>
      <div className="flex justify-between flex-col sm:flex-row mb-4 sm:mb-8 gap-4">
        <h1 className="text-2xl font-medium">Notes</h1>
        <div className="flex items-center flex-wrap gap-2 sm:justify-end justify-start">
          <Link to="/New">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 duration-300"
            onClick={() => {
              SetIsOpen(!isOpen);
            }}
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-4 flex-col sm:flex-row">
          <div className="flex flex-col flex-1 basis-0">
            <p className="mb-2 font-normal">Title</p>
            <input
              type="text"
              placeholder="Type Here..."
              className="w-full bg-transparent placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-lg shadow-gray-100 focus:ring-2 ring-blue-400"
              onChange={(e) => {
                setFindTitle(e.target.value);
              }}
            />
          </div>{" "}
          <div className="flex flex-col flex-1 basis-0">
            <p className="mb-2 font-normal">Tags</p>
            <Select
              options={DefaultOptions}
              components={{ Menu: CustomMenu }}
              isMulti={true}
              onChange={(e) => {
                setFilterTags([...e]);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 my-8 gap-4">
          {FiltredNotes.map((element) => (
            <Link to={"DYNAMICSEND"} state={{ note: element }} key={element.id}>
              <div className="bg-transparent placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-8 sm:py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-lg shadow-gray-100 focus:ring-2 ring-blue-400 flex items-center justify-center h-[auto] sm:h-[10rem] hover:translate-y-[-0.3rem] hover:shadow-xl cursor-pointer flex-col gap-2">
                {/* zrobić dynamiczne wysokości tutaj w kartach */}
                <h1 className="text-2xl font-normal text-center">
                  {element.Title}
                </h1>
                <div className="flex gap-1 flex-wrap items-center justify-center">
                  {element.Tags.map((tag, index) => {
                    const matchedOption = DefaultOptions.find(
                      (opt) => opt.id == tag
                    );
                    if (!matchedOption) return null;
                    return (
                      <div
                        className="bg-blue-600 px-2 py-1 rounded-lg text-white"
                        key={index}
                      >
                        <p className="font-bold text-xs">
                          {DefaultOptions.map((option) =>
                            option.id == tag && option.label !== ""
                              ? option.label
                              : ""
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
