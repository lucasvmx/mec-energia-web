import type { NextPage } from "next";
import Head from "next/head";

import DefaultTemplate from "../templates/DefaultTemplate";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate />
    </>
  );
};

export default Home;
