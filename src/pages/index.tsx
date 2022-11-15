import type { NextPage } from "next";
import Head from "next/head";

import { Container } from "@mui/material";

import ConsumerUnitCardGrid from "../components/ConsumerUnit/CardGrid";
import DefaultTemplate from "../templates/DefaultTemplate";
import Header from "../components/Header";

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
