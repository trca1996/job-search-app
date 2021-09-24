import Head from "next/head";
import Search from "../components/Search";

export default function Home() {
  return (
    <div className="flex flex-col p-2 lg:px-32 md:px-24">
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
        />
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
