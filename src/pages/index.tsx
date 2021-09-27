import Head from "next/head";
import Search from "../components/Search";
import SearchOptions from "../components/SearchOptions";
import { useEffect, useState } from "react";
import { getData } from "../api/getData";

import JobCard from "../components/JobCard";
import { Pagination } from "@mui/material";
import getSlug from "../helper/getSlug";

interface DataState {
  count: number;
  jobs: [];
}

interface SearchOptionsState {
  location: string;
  employment_type: string;
  remote: boolean | string;
}

const initialSearchOptions = {
  location: "",
  employment_type: "",
  remote: "",
};

export default function Home() {
  const [data, setData] = useState<DataState | null>(null);
  const [page, setPage] = useState(1);

  const [searchOptions, setSearchOptions] =
    useState<SearchOptionsState>(initialSearchOptions);
  const [search, setSearch] = useState("");

  const resultPerPage = 5;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const resetPage = () => {
    setPage(1);
  };

  useEffect(() => {
    getData({
      resultPerPage,
      page: page,
      location: searchOptions.location,
      employment_type: searchOptions.employment_type,
      remote: searchOptions.remote,
      search: search,
    }).then((res) => {
      setData(res);
    });
  }, [page, searchOptions, search]);

  const onHeaderSearch = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    setSearch(getSlug(value));
    resetPage();
  };

  return (
    <div className="flex flex-col py-2 px-3 lg:px-32 md:px-24">
      <Head>
        <title>Find Job</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>

      <h1 className="mb-6 font-bold text-black font-poppins text-2xl">
        JOBS
        <span className="text-gray-600 text-sm">ss</span>
      </h1>

      <div className="bg-search-img w-full py-10 px-5 rounded-xl flex justify-center self-center">
        <Search
          icon="work_outline"
          placeholder="Title, companies, expertise or benefits"
          button
          handleSubmit={onHeaderSearch}
          isForm
        />
      </div>

      <div className="my-6 lg:flex">
        <SearchOptions setOptions={setSearchOptions} resetPage={resetPage} />
        <div className="lg:pl-7 lg:py-0 py-7 flex-1">
          {data
            ? data.jobs.map((job: any) => (
                <JobCard
                  key={job.id}
                  role={job.role}
                  companyName={job.company_name}
                  employmentType={job.employment_type}
                  location={job.location}
                  logo={job.logo}
                  datePosted={job.date_posted}
                  remote={job.remote}
                />
              ))
            : "Loading..."}
          <Pagination
            count={data ? Math.floor(data.count / resultPerPage) : 10}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            size="small"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
