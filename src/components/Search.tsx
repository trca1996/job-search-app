import React from "react";

interface SearchProps {
  icon: string;
  placeholder: string;
  button?: boolean;
  paddingY?: "2" | "3" | "4" | "5";
}

const Search = (props: SearchProps) => {
  return (
    <div
      className={`flex justify-between items-center bg-white py-${
        props.paddingY || 1
      } px-1 rounded max-w-3xl flex-grow`}
    >
      <div className="flex items-center pl-5">
        <span className="material-icons text-gray-400">{props.icon}</span>
        <input
          className="placeholder-gray-400 outline-none border-0 pl-1"
          name="search"
          id="search"
          placeholder={props.placeholder}
        />
      </div>
      {props.button && (
        <button className="bg-blue-600 text-white rounded py-4 px-6">
          Search
        </button>
      )}
    </div>
  );
};

export default Search;
