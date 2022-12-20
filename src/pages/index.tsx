import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import { useFetchConsumerUnitsQuery } from "@/api";
import DefaultTemplate from "@/templates/DefaultTemplate";
import DashboardCardGrid from "@/components/Card/DashboardGrid";
import ConsumerUnitCard from "@/components/ConsumerUnit/Card";

const Home: NextPage = () => {
  const { data: consumerUnits } = useFetchConsumerUnitsQuery();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate disableGutters>
        <Container disableGutters maxWidth="xl">
          <DashboardCardGrid>
            {consumerUnits?.map((card) => (
              <ConsumerUnitCard
                disabled={card.disabled}
                favorite={card.favorite}
                id={card.id}
                pendenciesCount={card.pendenciesCount}
                postedCurrentInvoice={card.postedCurrentInvoice}
                title={card.title}
                key={card.id}
              />
            ))}
          </DashboardCardGrid>
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Home;
