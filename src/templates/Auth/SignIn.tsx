import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { SignInRequestPayload } from "@/types/auth";
import { getHeadTitle } from "@/utils/head";
import Footer from "@/components/Footer";

const defaultValues: SignInRequestPayload = {
  username: "",
  password: "",
};

const SignInTemplate = () => {
  const headTitle = useMemo(() => getHeadTitle("Entrar"), []);

  const {
    query: { error },
  } = useRouter();

  const form = useForm({ defaultValues });
  const { control, handleSubmit } = form;

  const handleOnSubmit: SubmitHandler<SignInRequestPayload> = ({
    username,
    password,
  }) => {
    signIn("credentials", { username, password, callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 5 }}>
        <Grid item xs={6}>
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            <Box sx={{ width: "380px", my: 9 }}>
              <Box
                height="112px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/icons/mec-energia.svg"
                  alt="Logo do MEC Energia"
                  height="144px"
                  width="144px"
                />
              </Box>

              <Box sx={{ my: 5 }}>
                <Typography
                  sx={{ my: 1 }}
                > 
                  O Sistema de Gestão de Contratos de Energia
                  visa economizar recursos das instituições de
                  ensino superior (IES) com a contratação de energia elétrica.
                </Typography>

                <Typography
                  sx={{ my: 1 }}
                >
                  Auxilia as IES a gerenciar o registro das faturas 
                  mensais de energia.
                </Typography>

                <Typography
                  sx={{ my: 1 }}
                >
                  Permite avaliar a adequação dos contratos de
                  energia elétrica e recomendar ajustes para otimizá-los.
                </Typography>
                  

                <Typography
                  sx={{ my: 1 }}
                >
                  O Sistema de Gestão de Contratos de Energia faz parte da
                  iniciativa de Universidades Sustentáveis.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
  
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column">
            <Box
              flexGrow={1}
              display="flex"
              justifyContent="left"
              alignItems="center"
            >
              <Paper sx={{ width: "471px", my: 16 }}>
                <Box
                  component="form"
                  display="flex"
                  flexDirection="column"
                  padding={3}
                  onSubmit={handleSubmit(handleOnSubmit)}
                >
                  <Box>
                    <Controller
                      control={control}
                      name="username"
                      rules={{
                        required: "Preencha este campo",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Insira um e-mail válido",
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          ref={ref}
                          value={value}
                          label="E-mail institucional"
                          error={Boolean(error)}
                          helperText={error?.message ?? " "}
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </Box>

                  <Box mt={3}>
                    <Controller
                      control={control}
                      name="password"
                      rules={{ required: "Preencha este campo" }}
                      render={({
                        field: { onChange, onBlur, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          ref={ref}
                          value={value}
                          label="Senha"
                          type="password"
                          error={Boolean(error)}
                          helperText={error?.message ?? " "}
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </Box>

                  <Box display="flex" flexDirection="row-reverse">
                    <Link variant="caption">Esqueci minha senha</Link>
                  </Box>

                  {error && (
                    <Box mt={2}>
                      <Alert severity="error" variant="filled">
                        E-mail não cadastrado e/ou senha inválida
                      </Alert>
                    </Box>
                  )}

                  <Box mt={2}>
                    <Button type="submit" variant="contained" fullWidth>
                      Entrar
                    </Button>
                  </Box>

                  <Box mt={5}>
                    <Box display="flex" justifyContent="center">
                      <Link>Não tenho cadastro</Link>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Footer />
    </>
  );
};

export default SignInTemplate;
