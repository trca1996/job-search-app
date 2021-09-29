import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import formatDate from "../helper/formatDate";

const details = () => {
  const router = useRouter();
  const [imageLoader, setImageLoader] = useState(true);
  const {
    role,
    companyName,
    employmentType,
    location,
    logo,
    datePosted,
    remote,
    description,
    jobUrl,
  } = router.query;

  return (
    <div className="flex flex-col py-2 px-3 lg:px-32 md:px-24 font-poppins">
      <Head>
        <title>{`${role}`}</title>
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

      <div className="my-6 lg:flex">
        <div className="flex-1 lg:max-w-sm lg:pr-3">
          <button
            className="text-blue-600 flex gap-3 items-center font-medium text-sm"
            onClick={() => router.back()}
          >
            <span className="material-icons">west</span>
            <span>Back to search</span>
          </button>

          <div className="mt-9">
            <p className="text-gray-400 uppercase text-sm font-bold mb-4">
              HOW TO APPLY
            </p>
            <p className="font-medium text-sm">You can apply on this link:</p>
            <a
              className="text-blue-600 font-medium text-sm"
              href={`${jobUrl}`}
              target="_blank"
            >
              {jobUrl}
            </a>
          </div>
        </div>

        <div className="lg:pl-7 lg:py-0 py-7 flex-1 flex flex-col font-roboto">
          <div className="flex lg:items-center gap-1 flex-col lg:flex-row">
            <h2 className="font-bold text-2xl">{role}</h2>

            <div className="flex gap-1">
              {employmentType && (
                <div className="mini-card">{employmentType}</div>
              )}

              {remote && <div className="mini-card">Remote</div>}
            </div>
          </div>

          {datePosted && (
            <div className="text-gray-400 flex items-center gap-1 mt-2">
              <span className="material-icons text-lg">schedule</span>
              {/* @ts-ignore */}
              <p className="w-max">{formatDate(datePosted)}</p>
            </div>
          )}

          <div className="flex gap-3 items-center my-8">
            {logo && imageLoader ? (
              <div className="rounded w-11 h-11 overflow-hidden">
                <img
                  className="w-full h-full"
                  //   @ts-ignore
                  src={logo}
                  alt="logo"
                  onError={() => setImageLoader(false)}
                />
              </div>
            ) : (
              <div className="rounded  w-11 h-11 flex items-center justify-center text-center bg-gray-200 text-gray-400">
                Not found.
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{companyName}</h3>
              {location && (
                <div className="text-gray-400 flex items-center gap-1">
                  <span className="material-icons text-lg">public</span>
                  <p className="flex-1">{location}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">{parse(`${description}`)}</div>
        </div>
      </div>
    </div>
  );
};

export default details;
