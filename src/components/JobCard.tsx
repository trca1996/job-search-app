import React, { useState } from "react";
import { useRouter } from "next/router";
import formatDate from "../helper/formatDate";

export interface jobCardProps {
  role: string;
  companyName: string;
  employmentType: string | null;
  location: string | null;
  logo: string | null;
  datePosted: string;
  remote: boolean | null;
  description: string;
  jobUrl: string | undefined;
}

const JobCard = ({
  role,
  companyName,
  employmentType,
  location,
  logo,
  datePosted,
  remote,
  description,
  jobUrl,
}: jobCardProps) => {
  const router = useRouter();
  const [imageLoader, setImageLoader] = useState(true);

  return (
    <div
      className="p-3 shadow-md rounded flex flex-col cursor-pointer font-roboto"
      onClick={() =>
        router.push({
          pathname: "/details",
          query: {
            role,
            companyName,
            employmentType,
            location,
            logo,
            datePosted,
            remote,
            description,
            jobUrl,
          },
        })
      }
    >
      <div className="flex gap-3">
        {logo && imageLoader ? (
          <div className="rounded w-24 h-24 overflow-hidden">
            <img
              className="w-full h-full"
              src={logo}
              alt="logo"
              onError={() => setImageLoader(false)}
            />
          </div>
        ) : (
          <div className="rounded  w-24 h-24 flex items-center justify-center text-center bg-gray-200 text-gray-400">
            Not found.
          </div>
        )}

        <div className="mb-4 flex-1">
          <p className="font-bold text-xs mb-2">{companyName}</p>
          <p className="font-normal text-base mb-3">{role}</p>
          <div className="flex gap-1">
            {employmentType && (
              <div className="mini-card">{employmentType}</div>
            )}

            {remote && <div className="mini-card">Remote</div>}
          </div>
        </div>
      </div>

      <div className="flex text-gray-400 items-center gap-3 justify-between sm:self-end">
        {location && (
          <div className="flex items-center gap-1 text-xs xl:text-base">
            <span className="material-icons">public</span>
            {location}
          </div>
        )}

        <div className="flex items-center gap-1 text-xs xl:text-base">
          <span className="material-icons">schedule</span>
          <p className="w-max">{formatDate(datePosted)}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
