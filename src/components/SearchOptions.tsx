import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import getSlug from "../helper/getSlug";
import Search from "./Search";

type Inputs = {
  fullTime: boolean;
  remote: boolean;
  location: string;
};

interface SearchOptionsState {
  location: string;
  employment_type: string;
  remote: boolean | string;
}

interface SearchOptionsProps {
  setOptions: Dispatch<SetStateAction<SearchOptionsState>>;
  resetPage: () => void;
}

const SearchOptions = ({ setOptions, resetPage }: SearchOptionsProps) => {
  const [searchString, setSearchString] = useState<string>("");
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const location = searchString
      ? getSlug(searchString)
      : data.location
      ? getSlug(data.location)
      : "";
    const employment_type = data.fullTime ? "full+time" : "";
    const remote = data.remote ? data.remote : "";
    resetPage();
    setOptions({
      location,
      employment_type,
      remote,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 lg:max-w-sm lg:pr-3"
    >
      <div className="flex items-center">
        <input type="checkbox" id="fullTime" {...register("fullTime")} />
        <label htmlFor="fullTime" className="pl-3 text-sm font-semibold">
          Full time
        </label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="remote" {...register("remote")} />
        <label htmlFor="remote" className="pl-3 text-sm font-semibold">
          Remote
        </label>
      </div>

      <div className="py-7">
        <p className="font-bold text-sm text-gray-500 pb-2">LOCATION</p>

        <Search
          icon="public"
          placeholder="City, state, zip code or country"
          paddingY="4"
          value={searchString}
          onChange={setSearchString}
        />
      </div>

      <div className="flex items-center pb-2">
        <input
          type="radio"
          id="london"
          value="London"
          disabled={searchString ? true : false}
          {...register("location")}
        />
        <label htmlFor="london" className="pl-3 text-sm font-semibold">
          London
        </label>
      </div>
      <div className="flex items-center pb-2">
        <input
          type="radio"
          id="amsterdam"
          value="Amsterdam"
          disabled={searchString ? true : false}
          {...register("location")}
        />
        <label htmlFor="amsterdam" className="pl-3 text-sm font-semibold">
          Amsterdam
        </label>
      </div>
      <div className="flex items-center pb-2">
        <input
          type="radio"
          id="newYork"
          value="New York"
          disabled={searchString ? true : false}
          {...register("location")}
        />
        <label htmlFor="newYork" className="pl-3 text-sm font-semibold">
          New York
        </label>
      </div>
      <div className="flex items-center pb-2">
        <input
          type="radio"
          id="berlin"
          value="Berlin"
          disabled={searchString ? true : false}
          {...register("location")}
        />
        <label htmlFor="berlin" className="pl-3 text-sm font-semibold">
          Berlin
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded py-2 px-8 w-full"
      >
        Search
      </button>
    </form>
  );
};

export default SearchOptions;
