import dateFormat from "dateformat";

const formatDate = (date: string) => {
  const currentDate = Date.now();
  const diffTime = Math.abs(currentDate - Date.parse(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "day ago";
  if (diffDays <= 10) return `${diffDays} days ago`;
  return dateFormat(date, "mmmm dS");
};

export default formatDate;
