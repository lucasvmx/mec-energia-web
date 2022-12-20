import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import { useFetchConsumerUnitsQuery, useFetchDistributorsQuery } from "@/api";
import DefaultTemplate from "@/templates/DefaultTemplate";
import DashboardCardGrid from "@/components/Card/DashboardGrid";
import ConsumerUnitCard from "@/components/ConsumerUnit/Card";
import DistributorCard from "@/components/Distributor/Card";

const Home: NextPage = () => {
  const { data: consumerUnits } = useFetchConsumerUnitsQuery();
  const { data: distributors } = useFetchDistributorsQuery();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate disableGutters>
        <Container disableGutters maxWidth="xl">
          <DashboardCardGrid>
            {distributors?.map((card) => (
              <DistributorCard
                disabled={card.disabled}
                id={card.id}
                hasPendencies={card.hasPendencies}
                title={card.title}
                key={card.id}
              />
            ))}

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
