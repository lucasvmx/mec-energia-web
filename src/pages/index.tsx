import type { NextPage } from "next";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useFetchConsumerUnitsQuery } from "@/api";
import DefaultTemplate from "@/templates/DefaultTemplate";
import ConsumerUnitCard from "@/components/ConsumerUnit/Card";

const Home: NextPage = () => {
  const { data: consumerUnits } = useFetchConsumerUnitsQuery();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate>
        <Container disableGutters>
          <Box display="flex" justifyContent="space-evenly">
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
          </Box>
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Home;
