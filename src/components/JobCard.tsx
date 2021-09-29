import React, { useState } from "react";
import dateFormat from "dateformat";

interface jobCardProps {
  role: string;
  companyName: string;
  employmentType: string | null;
  location: string | null;
  logo: string | null;
  datePosted: string;
  remote: boolean | null;
}

const JobCard = ({
  role,
  companyName,
  employmentType,
  location,
  logo,
  datePosted,
  remote,
}: jobCardProps) => {
  const [imageLoader, setImageLoader] = useState(true);

  const formatDate = (date: string) => {
    const currentDate = Date.now();
    const diffTime = Math.abs(currentDate - Date.parse(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "day ago";
    if (diffDays <= 10) return `${diffDays} days ago`;
    return dateFormat(date, "mmmm dS");
  };

  return (
    <div className="p-3 shadow-md rounded flex flex-col">
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
          <p className="font-bold font-roboto text-xs mb-2">{companyName}</p>
          <p className="font-roboto font-normal text-base mb-3">{role}</p>
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
