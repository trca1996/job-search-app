import Head from "next/head";
import Search from "../components/Search";
import SearchOptions from "../components/SearchOptions";
import { useEffect, useState } from "react";
import { getData } from "../api/getData";

import JobCard from "../components/JobCard";
import { Pagination } from "@mui/material";

interface dataState {
  count: number;
  jobs: [];
}

export default function Home() {
  const [data, setData] = useState<dataState | null>(null);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getData({ resultPerPage: 5, page: 1 }).then((res) => {
      setData(res);
    });
  }, []);

  console.log(data);

  const onHeaderSearch = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    console.log(value);
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
        <SearchOptions />
        <div className="lg:px-7 lg:py-0 py-7 flex-1">
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
            count={data ? data.count : 10}
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
