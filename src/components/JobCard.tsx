import React from "react";

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
  const dayDifference = datePosted && Date.now() - Date.parse(datePosted);
  const daysAgo =
    new Date(dayDifference).getDay() < 10
      ? `${new Date(dayDifference).getDay()} days ago`
      : new Date(dayDifference).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });

  return (
    <div className="p-3 mb-5 shadow-md rounded flex">
      {logo ? (
        <div className="rounded w-24 h-24 overflow-hidden">
          <img className="w-full h-full" src={logo} alt="logo" />
        </div>
      ) : (
        <div className="rounded w-24 h-24 flex items-center justify-center">
          Not found.
        </div>
      )}

      <div className="flex flex-col mx-4 w-full justify-between">
        <div className="mb-4">
          <p className="font-bold font-roboto text-xs mb-2">{companyName}</p>
          <p className="font-roboto font-normal text-base mb-3">{role}</p>
          <div>
            {employmentType && (
              <div className="mini-card">{employmentType}</div>
            )}

            {remote && <div className="mini-card">Remote</div>}
          </div>
        </div>

        <div className="flex text-gray-400 items-center gap-3 self-end">
          {location && (
            <div className="flex items-center gap-1">
              <span className="material-icons">public</span>
              {location}
            </div>
          )}

          <div className="flex items-center gap-1">
            <span className="material-icons">schedule</span>
            {daysAgo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
