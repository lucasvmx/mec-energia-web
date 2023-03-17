import type { NextPage } from "next";

import FormDrawerV2 from "@/components/Form/DrawerV2";
import { Fragment, useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";

const Header = () => (
  <>
    <Typography variant="h4">Subgrupo A4</Typography>

    <Box mt={1}>
      <Typography variant="body2">Distribuidora: Neoenergia</Typography>
    </Box>

    <Box mt={4}>
      <Alert>
        Siga <u>este passo-a-passo</u> para mais informações.
      </Alert>
    </Box>
  </>
);

const SectionOne = () => (
  <>
    <Typography variant="h5">Seção 1</Typography>

    <Grid container pt={2}>
      <Grid item xs={6}>
        <TextField />
      </Grid>

      <Grid item xs={6}>
        <TextField />
      </Grid>
    </Grid>
  </>
);

const SectionTwo = () => (
  <>
    <Typography variant="h5">Seção 2</Typography>

    <Grid container pt={2} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body2" color="primary.main">
          NA
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField />
      </Grid>

      <Grid item xs={6}>
        <TextField />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" color="primary.main">
          Ponta
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField />
      </Grid>
    </Grid>
  </>
);

const SectionThree = () => (
  <>
    <Typography variant="h5">Seção 3</Typography>

    <Grid container pt={2} spacing={2}>
      <Grid item xs={12} container>
        <Grid item xs={3}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={6}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={7}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={8}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={9}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={10}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={11}>
          <TextField fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12}>
          <TextField fullWidth />
        </Grid>
      </Grid>
    </Grid>
  </>
);

const Footer = () => (
  <>
    <Alert>Corrija os erros acima antes de gravar</Alert>

    <Box mt={1} display="flex">
      <Button variant="contained">Gravar</Button>

      <Box ml={1}>
        <Button variant="outlined">Cancelar</Button>
      </Box>
    </Box>
  </>
);

const FormExamplePage: NextPage = () => {
  const [open, setOpen] = useState(true); // provavelmetne vc vai salvar no redux ao inves do useState

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleSumit = () => {
    console.log("Testando")
  }
  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>Abrir formulário</Button>

      <FormDrawerV2
        handleSubmitDrawer={handleSumit}
        open={open}
        title="Lançar tarifas"
        header={<Header />}
        sections={[
          <SectionOne key={0} />,
          <SectionTwo key={1} />,
          <SectionThree key={2} />, // faz um map pra adicionar essa key, talvez
        ]}
        footer={<Footer />}
        handleCloseDrawer={handleCloseDrawer}
      />
    </Fragment>
  );
};

export default FormExamplePage;
