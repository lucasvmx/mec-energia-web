import type { NextPage } from "next";
import Head from "next/head";

import {
  AttachMoneyRounded,
  InsightsRounded,
  TungstenOutlined,
} from "@mui/icons-material";

import DefaultTemplate from "@/templates/DefaultTemplate";
import { Box, Button, Container } from "@mui/material";
import Card from "@/components/Card";

const MockButton = () => (
  <Button
    sx={{ textTransform: "none" }}
    variant="contained"
    size="small"
    disableElevation
  >
    Lançar novembro
  </Button>
);

const MockButton2 = () => (
  <Button
    sx={{ textTransform: "none", color: "black", borderColor: "black" }}
    variant="outlined"
    size="small"
    disableElevation
  >
    Lançar novembro
  </Button>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DefaultTemplate>
        <Container disableGutters>
          <Box display="flex" justifyContent="space-evenly">
            <Card
              title="Neoenergia"
              variant="warning"
              action="Tarifas pendentes"
              ActionIcon={AttachMoneyRounded}
              actionIconBadgeContent="!"
            />

            <Card
              title="Campus Gama"
              variant="warning"
              favorite
              action={<MockButton2 />}
              ActionIcon={TungstenOutlined}
              actionIconBadgeContent={3}
            />

            <Card
              title="Campus Darcy Gleba A"
              favorite={false}
              action={<MockButton />}
              ActionIcon={InsightsRounded}
            />

            <Card
              title="Campus Darcy Gleba A"
              favorite
              action={"Em dia"}
              ActionIcon={InsightsRounded}
            />
          </Box>
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default Home;
