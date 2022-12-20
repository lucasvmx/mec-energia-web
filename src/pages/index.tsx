import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import DefaultTemplate from "@/templates/Default";
import DashboardCardGrid from "@/templates/Dashboard/Grid";
import DashboardFilterButtons from "@/templates/Dashboard/FilterButtons";
import DashboardDistributorsCards from "@/templates/Dashboard/DistributorsCards";
import DashboardConsumerUnitsCards from "@/templates/Dashboard/ConsumerUnitsCards";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Painel</title>
      </Head>

      <DefaultTemplate disableGutters headerAction={<DashboardFilterButtons />}>
        <Container disableGutters maxWidth="xl">
          <DashboardCardGrid>
            <DashboardDistributorsCards />

            <DashboardConsumerUnitsCards />
          </DashboardCardGrid>
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Dashboard;
