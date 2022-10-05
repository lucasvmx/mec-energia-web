import { Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import ConsumerUnitCard from "../components/ConsumerUnitCard";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Container>
        <Box py={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ConsumerUnitCard
                title="Campus Darcy Ribeiro Gleba A"
                pendencies={[
                  { month: 11, year: 2022 },
                  { month: 10, year: 2022 },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ConsumerUnitCard
                title="Campus Gama"
                isFavorite
                pendencies={[]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ConsumerUnitCard title="Campus Ceilândia" disabled />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
