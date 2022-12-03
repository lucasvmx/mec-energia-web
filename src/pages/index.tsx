import type { NextPage } from "next";
import Head from "next/head";

import { Container } from "@mui/material";

import Header from "@/components/Header";
import DashboardCardGrid from "@/components/DashboardCasdGrid";
import ConsumerUnitCardGrid from "@/components/ConsumerUnit/CardGrid";
import DefaultTemplate from "@/templates/DefaultTemplate";

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
