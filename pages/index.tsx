import { Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import UCCard from "../UCCard";

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
              <UCCard />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <UCCard />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <UCCard />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <UCCard />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <UCCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
