import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveInstitutionId,
  selectIsInstitutionEditFormOpen,
  setIsErrorNotificationOpen,
  setIsInstitutionEditFormOpen,
  setIsSuccessNotificationOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";
import { PatternFormat } from "react-number-format";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import FormWarningDialog from "../../ConsumerUnit/Form/WarningDialog";
import { useEditInstitutionMutation, useGetInstitutionQuery } from "@/api";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { FormErrorsAlert } from "@/components/Form/FormErrorsAlert";
import {
  EditInstitutionForm,
  EditInstitutionRequestPayload,
} from "@/types/institution";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const defaultValues: EditInstitutionForm = {
  acronym: "",
  name: "",
  cnpj: "",
};

const EditInstitutionForm = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsInstitutionEditFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const currentInstitutiionId = useSelector(selectActiveInstitutionId);
  const { data: currentInstitutiion } = useGetInstitutionQuery(
    currentInstitutiionId || skipToken
  );
  const [
    editInstitution,
    { isError, isSuccess, isLoading, reset: resetMutation },
  ] = useEditInstitutionMutation();
  const form = useForm({ defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = form;

  useEffect(() => {
    if (!currentInstitutiion) return;
    setValue("acronym", currentInstitutiion.acronym ?? "");
    setValue("name", currentInstitutiion.name ?? "");
    setValue("cnpj", currentInstitutiion.cnpj ?? "");
  }, [currentInstitutiion, setValue]);

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  };

  const handleDiscardForm = useCallback(() => {
    handleCloseDialog();
    reset();
    dispatch(setIsInstitutionEditFormOpen(false));
  }, [dispatch, reset]);

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<EditInstitutionForm> = async (data) => {
    const cnpjSemMascara = data.cnpj.replace(/[\/.-]/g, "");
    data.cnpj = cnpjSemMascara;
    if (!currentInstitutiionId) return;
    const body: EditInstitutionRequestPayload = {
      name: data.name,
      cnpj: data.cnpj,
      acronym: data.acronym,
      id: currentInstitutiionId,
    };
    await editInstitution(body);
  };

  //Notificações
  const handleNotification = useCallback(() => {
    if (isSuccess) {
      dispatch(
        setIsSuccessNotificationOpen({
          isOpen: true,
          text: "Instituição editada com sucesso!",
        })
      );
      reset();
      resetMutation();
      dispatch(setIsInstitutionEditFormOpen(false));
    } else if (isError) {
      dispatch(
        setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao editada instituição.",
        })
      );
      resetMutation();
    }
  }, [dispatch, isError, isSuccess, reset, resetMutation]);

  useEffect(() => {
    handleNotification();
  }, [handleNotification, isSuccess, isError]);

  //Validações

  const hasEnoughCaracteresLength = (value: EditInstitutionForm["name"]) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres";
    return true;
  };

  return (
    <FormDrawer open={isEditFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Adicionar Instituição</Typography>
              <Typography>* campos obrigatórios</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">Instituição</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="acronym"
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
                    label="Sigla *"
                    placeholder="Ex.: UFX"
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
                name="name"
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
                    placeholder="Ex.: Univerdade Federal de ..."
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
                name="cnpj"
                rules={{
                  required: "Preencha este campo",
                  pattern: {
                    value:
                      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/,
                    message: "Insira um CNPJ válido com 14 dígitos",
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <PatternFormat
                    value={value}
                    customInput={TextField}
                    label="CNPJ *"
                    format="##.###.###/####-##"
                    placeholder="Ex.: 12345678000167"
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <FormErrorsAlert
              hasErrors={Object.keys(errors).length > 0 ? true : false}
            />

            <Grid item xs={3}>
              <SubmitButton isLoading={isLoading} />
            </Grid>

            <Grid item xs={2}>
              <Button variant="text" onClick={handleCancelEdition} size="large">
                <Typography pl={3} pr={3}>
                  Cancelar
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <FormWarningDialog
            open={shouldShowCancelDialog}
            entity={"instituição"}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>
      </FormProvider>
    </FormDrawer>
  );
};

export default EditInstitutionForm;
