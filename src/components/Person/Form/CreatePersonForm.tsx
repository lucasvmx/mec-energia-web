import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsPersonCreateFormOpen,
  setIsErrorNotificationOpen,
  setIsPersonCreateFormOpen,
  setIsSuccessNotificationOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import FormWarningDialog from "../../ConsumerUnit/Form/WarningDialog";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { FormErrorsAlert } from "@/components/Form/FormErrorsAlert";
import { CreatePersonForm, CreatePersonRequestPayload } from "@/types/person";
import { useCreatePersonMutation, useGetAllInstitutionQuery } from "@/api";
import { isValidEmail } from "@/utils/validations/form-validations";
import { FormInfoAlert } from "@/components/Form/FormInfoAlert";

const defaultValues: CreatePersonForm = {
  email: "",
  firstName: "",
  lastName: "",
  university: null,
  type: "university_user",
};

const CreatePersonForm = () => {
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsPersonCreateFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const { data: institutions } = useGetAllInstitutionQuery();
  const [
    createPerson,
    { isError, isSuccess, isLoading, reset: resetMutation },
  ] = useCreatePersonMutation();
  const form = useForm({ defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = form;
  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  };

  const institutionsOptions = useMemo(() => {
    return institutions?.map((institution) => ({
      label: institution.name,
      id: institution.id,
    }));
  }, [institutions]);

  const handleDiscardForm = useCallback(() => {
    handleCloseDialog();
    reset();
    dispatch(setIsPersonCreateFormOpen(false));
  }, [dispatch, reset]);

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<CreatePersonForm> = async (data) => {
    const { email, firstName, lastName, type, university } = data;
    console.log("Data===>>>>", data);
    const body: CreatePersonRequestPayload = {
      email,
      firstName,
      lastName,
      type,
      university: university?.id ?? 0,
    };
    await createPerson(body);
  };

  //Notificações
  const handleNotification = useCallback(() => {
    if (isSuccess) {
      dispatch(
        setIsSuccessNotificationOpen({
          isOpen: true,
          text: "Pessoa adicionada com sucesso!",
        })
      );
      reset();
      resetMutation();
      dispatch(setIsPersonCreateFormOpen(false));
    } else if (isError) {
      dispatch(
        setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao adicionar pessoa.",
        })
      );
      resetMutation();
    }
  }, [dispatch, isError, isSuccess, reset, resetMutation]);

  useEffect(() => {
    handleNotification();
  }, [handleNotification, isSuccess, isError]);

  //Validações

  const hasEnoughCaracteresLength = (
    value: CreatePersonForm["firstName"] | CreatePersonForm["lastName"]
  ) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres";
    return true;
  };

  return (
    <FormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Adicionar pessoa</Typography>
              <Typography>* campos obrigatórios</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">Informações pessoais</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="firstName"
                rules={{
                  required: "Preencha este campo",
                  validate: hasEnoughCaracteresLength,
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome *"
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: "Preencha este campo",
                  validate: hasEnoughCaracteresLength,
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Sobrenome *"
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Preencha este campo",

                  validate: (e) => isValidEmail(e),
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="E-mail institucional *"
                    placeholder="Ex.: voce@universidade.br"
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name={"university"}
                rules={{ required: "Selecione alguma universidade" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Autocomplete
                      id="university-select"
                      options={institutionsOptions || []}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: 450 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Instituição *"
                          placeholder="Selecione uma instituição"
                          error={!!error}
                        />
                      )}
                      value={value}
                      onBlur={onBlur}
                      onChange={(_, data) => {
                        onChange(data);
                        return data;
                      }}
                    />
                    {errors.university !== undefined && (
                      <Typography
                        mt={0.4}
                        ml={2}
                        sx={{ color: "error.main", fontSize: 13 }}
                      >
                        {errors.university.message}
                      </Typography>
                    )}

                    {console.log("Error", errors.university)}
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">Perfil</Typography>
            </Grid>

            <Grid item xs={8}>
              <Controller
                control={control}
                name="type"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <RadioGroup value={value} onChange={onChange}>
                      <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="self-start"
                      >
                        <FormControlLabel
                          value="university_user"
                          control={<Radio />}
                          label="Operacional"
                        />
                        <FormHelperText>
                          Acesso às tarefas básicas do sistema como: gerenciar
                          unidades consumidoras e distribuidoras, lançar faturas
                          e tarifas, além de gerar recomendações.
                        </FormHelperText>
                      </Box>
                      <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="self-start"
                      >
                        <FormControlLabel
                          value="university_admin"
                          control={<Radio />}
                          label="Gestão"
                        />
                        <FormHelperText>
                          Permite gerenciar o perfil das outras pessoas que usam
                          o sistema, além das tarefas operacionais.
                        </FormHelperText>
                      </Box>
                    </RadioGroup>
                    <FormInfoAlert infoText="A pessoa receberá um e-mail com instruções para gerar uma senha e realizar o primeiro acesso ao sistema." />
                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <FormErrorsAlert
              hasErrors={Object.keys(errors).length > 0 ? true : false}
            />

            <Grid container spacing={10}>
              <Grid item xs={2}>
                <SubmitButton isLoading={isLoading} />
              </Grid>

              <Grid item xs={2}>
                <Button
                  variant="text"
                  onClick={handleCancelEdition}
                  size="large"
                >
                  <Typography pl={3} pr={3}>
                    Cancelar
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <FormWarningDialog
            open={shouldShowCancelDialog}
            entity={"pessoa"}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>
      </FormProvider>
    </FormDrawer>
  );
};

export default CreatePersonForm;
