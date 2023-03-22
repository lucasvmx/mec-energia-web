import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePersonId,
  selectIsPersonEditFormOpen,
  setIsErrorNotificationOpen,
  setIsPersonEditFormOpen,
  setIsSuccessNotificationOpen,
} from "../../../store/appSlice";

import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Autocomplete,
  Box,
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
import {
  EditPersonForm,
  EditPersonRequestPayload,
  UserRole,
} from "@/types/person";
import {
  useEditPersonMutation,
  useGetAllInstitutionQuery,
  useGetPersonQuery,
} from "@/api";
import { isValidEmail } from "@/utils/validations/form-validations";
import { FormInfoAlert } from "@/components/Form/FormInfoAlert";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import FormDrawerV2 from "@/components/Form/DrawerV2";

const defaultValues: EditPersonForm = {
  email: "",
  firstName: "",
  lastName: "",
  university: null,
  type: UserRole.UNIVERSITY_USER,
};

const EditPersonForm = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsPersonEditFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const { data: institutions } = useGetAllInstitutionQuery();
  const currentPersonId = useSelector(selectActivePersonId);
  const { data: currentPerson } = useGetPersonQuery(
    currentPersonId || skipToken
  );
  const [editPerson, { isError, isSuccess, isLoading, reset: resetMutation }] =
    useEditPersonMutation();
  const form = useForm({ defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (!currentPerson) return;
    const institution = institutionsOptions?.find(
      (institution) => institution.id === currentPerson.university
    );
    if (!institution) return;
    setValue("firstName", currentPerson.firstName);
    setValue("lastName", currentPerson.lastName);
    setValue("email", currentPerson.email);
    setValue("type", currentPerson.type);
    setValue("university", institution);
  }, [currentPerson, institutionsOptions, setValue]);

  const handleDiscardForm = useCallback(() => {
    handleCloseDialog();
    reset();
    dispatch(setIsPersonEditFormOpen(false));
  }, [dispatch, reset]);

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<EditPersonForm> = async (data) => {
    const { email, firstName, lastName, type, university } = data;

    if (!currentPerson?.id) return;
    const body: EditPersonRequestPayload = {
      email,
      firstName,
      lastName,
      type,
      university: university?.id ?? 0,
      id: currentPerson?.id,
    };
    await editPerson(body);
  };

  //Notificações
  const handleNotification = useCallback(() => {
    if (isSuccess) {
      dispatch(
        setIsSuccessNotificationOpen({
          isOpen: true,
          text: "Pessoa editada com sucesso!",
        })
      );
      reset();
      resetMutation();
      dispatch(setIsPersonEditFormOpen(false));
    } else if (isError) {
      dispatch(
        setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao editar pessoa.",
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
    value: EditPersonForm["firstName"] | EditPersonForm["lastName"]
  ) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres";
    return true;
  };

  const PersonalInformationSection = useCallback(() => (
    <>
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
            </>
          )}
        />
      </Grid>
    </>
  ), [control, errors.university, institutionsOptions])

  const PerfilSection = useCallback(() => (
    <>
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
    </>

  ), [control])

  return (
    <Fragment>
      <FormDrawerV2
        errorsLength={Object.keys(errors).length}
        open={isEditFormOpen}
        handleCloseDrawer={handleCancelEdition}
        handleSubmitDrawer={handleSubmit(onSubmitHandler)}
        isLoading={isLoading}
        title="Editar Pessoa"
        header={<></>}
        sections={[
          <PersonalInformationSection key={0} />,
          <PerfilSection key={1} />
        ]}
      />

      <FormWarningDialog
        open={shouldShowCancelDialog}
        entity={"pessoa"}
        onClose={handleCloseDialog}
        onDiscard={handleDiscardForm}
      />

    </Fragment>
  )
};

export default EditPersonForm;
