import type { NextPage } from "next";
import Head from "next/head";

import Container from "@mui/material/Container";

import DefaultTemplate from "@/templates/DefaultTemplate";
import ConsumerUnitCardGrid from "@/components/ConsumerUnit/CardGrid";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate>
        <Container disableGutters>
          <ConsumerUnitCardGrid />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Home;
