import React from "react";

interface SearchProps {
  icon: string;
  placeholder: string;
  button?: boolean;
}

const Search = (props: SearchProps) => {
  return (
    <div className="bg-search-img w-full py-10 px-5 rounded-xl max-w-screen-lg flex justify-center">
      <div className="flex justify-between items-center bg-white py-1 pr-1 rounded max-w-3xl flex-grow">
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
    </div>
  );
};

export default Search;
