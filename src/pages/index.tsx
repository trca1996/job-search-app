import Head from "next/head";
import Search from "../components/Search";
import SearchOptions from "../components/SearchOptions";
import { useEffect, useState } from "react";
import { getData } from "../api/getData";

import JobCard from "../components/JobCard";
import { LinearProgress, Pagination } from "@mui/material";
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

const initialData = {
  count: 0,
  jobs: [],
};

const initialSearchOptions = {
  location: "",
  employment_type: "",
  remote: "",
};

export default function Home() {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getData({
      resultPerPage,
      page: page,
      location: searchOptions.location,
      employment_type: searchOptions.employment_type,
      remote: searchOptions.remote,
      search: search,
    })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, searchOptions, search]);

  const onHeaderSearch = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    setSearch(getSlug(value));
    resetPage();
  };

  return (
    <div className="flex flex-col py-2 px-3 lg:px-32 md:px-24 font-poppins">
      <Head>
        <title>Find Job</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>

      <h1 className="mb-6 font-bold text-black text-2xl">
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
        <div className="lg:pl-7 lg:py-0 py-7 flex-1 flex flex-col gap-5">
          {loading ? (
            <LinearProgress />
          ) : (
            <LinearProgress value={100} variant="determinate" />
          )}
          {data.count > 0
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
                  description={job.text}
                  jobUrl={job.url}
                />
              ))
            : !loading && <div>There is no jobs for this search</div>}
          <Pagination
            className="self-end"
            count={data.count > 0 ? Math.floor(data.count / resultPerPage) : 0}
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
