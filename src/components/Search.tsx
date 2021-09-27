import React, { Dispatch, Fragment, useState } from "react";

interface SearchProps {
  icon: string;
  placeholder: string;
  button?: boolean;
  paddingY?: "2" | "3" | "4" | "5";
  handleSubmit?: (e: React.SyntheticEvent, value: string) => void;
  isForm?: boolean;
  value?: string;
  onChange?: Dispatch<string>;
}

const Search = ({
  icon,
  placeholder,
  button,
  paddingY,
  handleSubmit = () => {},
  isForm = false,
  value,
  onChange = () => {},
}: SearchProps) => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      {isForm ? (
        <form
          onSubmit={(e) => handleSubmit(e, searchString)}
          className={`flex items-center bg-white py-${
            paddingY || 1
          } px-1 rounded max-w-3xl flex-grow shadow-lg`}
        >
          <div className="flex items-center pl-5 flex-grow">
            <span className="material-icons text-gray-400">{icon}</span>
            <input
              className="placeholder-gray-400 outline-none border-0 pl-1 w-full"
              name="search"
              id="search"
              placeholder={placeholder}
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          {button && (
            <button
              type="submit"
              className="bg-blue-600 text-white rounded py-4 px-6"
            >
              Search
            </button>
          )}
        </form>
      ) : (
        <Fragment>
          <div
            className={`flex items-center px-5 flex-grow rounded-md shadow-md py-${
              paddingY || 1
            }`}
          >
            <span className="material-icons text-gray-400">{icon}</span>
            <input
              className="placeholder-gray-400 outline-none border-0 pl-1 w-full"
              name="search"
              id="search"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {button && (
              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-4 px-6"
              >
                Search
              </button>
            )}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Search;
