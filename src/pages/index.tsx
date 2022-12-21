import type { NextPage } from "next";
import Head from "next/head";

import { Container } from "@mui/material";
import DashboardCardGrid from "../components/DashboardCasdGrid";
import DefaultTemplate from "../templates/DefaultTemplate";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate>
        <Container disableGutters>
          <DashboardCardGrid />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Home;
