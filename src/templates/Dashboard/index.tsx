import { useMemo } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { getHeadTitle } from "@/utils/head";
import DefaultTemplate from "@/templates/Default";
import DashboardFilterButtons from "@/templates/Dashboard/FilterButtons";
import DashboardCardGrid from "@/templates/Dashboard/Grid";

const DashboardTemplate = () => {
  const headTitle = useMemo(() => getHeadTitle("Painel"), []);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>

      <DefaultTemplate disableGutters headerAction={<DashboardFilterButtons />}>
        <Container maxWidth="xl">
          <DashboardCardGrid />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default DashboardTemplate;
