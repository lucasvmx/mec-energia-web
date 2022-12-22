import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import DefaultTemplate from "@/templates/Default";
import DashboardFilterButtons from "@/templates/Dashboard/FilterButtons";
import DashboardCardGrid from "@/templates/Dashboard/Grid";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Painel</title>
      </Head>

      <DefaultTemplate disableGutters headerAction={<DashboardFilterButtons />}>
        <Container maxWidth="xl">
          <DashboardCardGrid />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Dashboard;
