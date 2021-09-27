import axios from "axios";
import qs from "qs";

interface getDataProps {
  page?: number;
  resultPerPage?: 5 | 10 | 20 | 25 | 50 | 100;
  search?: string;
  location?: string;
  remote?: boolean | string;
  employment_type?: string;
}

export const getData = async ({
  page = 1,
  resultPerPage = 5,
  search = "",
  location = "",
  remote = "",
  employment_type = "",
}: getDataProps) => {
  const actualPage = Math.ceil(page / (100 / resultPerPage)) || 1;
  const skip = ((page - 1) % (100 / resultPerPage)) * resultPerPage;

  const response = await axios.get(
    "https://mycorsproxy-it.herokuapp.com/https://findwork.dev/api/jobs/",
    {
      params: {
        page: actualPage,
        search,
        remote,
        location,
        employment_type,
      },
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { encode: false });
      },
    }
  );

  const data = response.data.results;

  if (!response.data.count) return { count: 0, jobs: [] };

  const finalResults = data.slice(skip, resultPerPage + skip);
  const { count } = response.data;
  // console.log("PAGE: " + page);
  // console.log("ACTUALPAGE: " + actualPage);
  // console.log("SKIP: " + skip);
  // console.log(finalResults);

  return { count, jobs: finalResults };
};
