import React, { useState } from "react";

interface SearchProps {
  icon: string;
  placeholder: string;
  button?: boolean;
  paddingY?: "2" | "3" | "4" | "5";
  handleSubmit: (e: React.SyntheticEvent, value: string) => void;
}

const Search = (props: SearchProps) => {
  const [searchString, setSearchString] = useState("");

  return (
    <form
      onSubmit={(e) => props.handleSubmit(e, searchString)}
      className={`flex justify-between items-center bg-white py-${
        props.paddingY || 1
      } px-1 rounded max-w-3xl flex-grow shadow`}
    >
      <div className="flex items-center pl-5">
        <span className="material-icons text-gray-400">{props.icon}</span>
        <input
          className="placeholder-gray-400 outline-none border-0 pl-1"
          name="search"
          id="search"
          placeholder={props.placeholder}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      {props.button && (
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-4 px-6"
        >
          Search
        </button>
      )}
    </form>
  );
};

export default Search;
