import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { isAfter, isFuture, isValid } from "date-fns";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import {
  selectIsConsumerUnitEditFormOpen,
  setIsConsumerUnitEditFormOpen,
} from "@/store/appSlice";
import FormDrawer from "@/components/Form/Drawer";
import { EditConsumerUnitForm } from "@/types/consumerUnit";
import FormWarningDialog from "@/components/ConsumerUnit/Form/WarningDialog";
import { useGetContractQuery, useGetDistributorsQuery, useGetSubgroupsQuery } from "@/api";
import { useSession } from "next-auth/react";
import { DistributorPropsTariffs } from "@/types/distributor";
import DistributorCreateFormDialog from "@/components/Distributor/Form/CreateForm";
import SucessNotification from "@/components/Notification/SucessNotification";
import FailNotification from "@/components/Notification/FailNotification";
import { Subgroup } from "@/types/subgroups";

const defaultValues: EditConsumerUnitForm = {
  isActive: true,
  title: "askjdf",
  code: "",
  distributor: "",
  startDate: null,
  supplyVoltage: "",
  tariffFlag: "G",
  contracted: "",
  peakContractedDemandInKw: "",
  offPeakContractedDemandInKw: "",
};

const ConsumerUnitEditForm = (currentConsumerUnitId: number) => {

  const { data: session } = useSession()
  const { data: subgroupsList } = useGetSubgroupsQuery()
  const { data: distributorList } = useGetDistributorsQuery(session?.user?.university_id || 0)
  const { data: contract } = useGetContractQuery(1) // TODO - Adicionar o id
  console.log("currentConsumerUnitId", currentConsumerUnitId)

  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsConsumerUnitEditFormOpen);
  const [shouldShowDistributoFormDialog, setShouldShowDistributoFormDialog] = useState(false);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [openSucessNotification, setOpenSucessNotification] = useState(false)
  const [openFailNotification, setOpenFailNotification] = useState(false)

  console.log("Contratos", contract)
  const form = useForm({ mode: "all", defaultValues });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = form;

  const tariffFlag = watch("tariffFlag");

  console.log("tipo de tarifaca", tariffFlag)

  useEffect(() => {
    const {
      code,
      contracted,
    } = defaultValues;

    const currentContract = contract?.find(con => con.endDate === null)
    setValue("title", currentContract?.url || '')
    setValue("isActive", true) //TODO COrrir com o valor vindo da api
    setValue("code", code);
    setValue("distributor", currentContract?.distributor as number)
    setValue("startDate", currentContract?.startDate as Date)
    setValue("contracted", contracted);
    setValue("supplyVoltage", currentContract?.supplyVoltage as number)
    setValue("contracted", currentContract?.peakContractedDemandInKw as number)
    setValue("peakContractedDemandInKw", currentContract?.peakContractedDemandInKw as number);
    setValue("offPeakContractedDemandInKw", currentContract?.offPeakContractedDemandInKw as number);
  });


  // Validações

  const isValidDate = (date: EditConsumerUnitForm["startDate"]) => {
    if (!date || !isValid(date)) {
      return "Data inválida";
    }

    if (isFuture(date)) {
      return "Datas futuras não são permitidas";
    }

    if (!isAfter(date, new Date("2010"))) {
      return "Datas antes de 2010 não são permitidas";
    }

    return true;
  };

  const isInSomeSugroups = (supplied: EditConsumerUnitForm['supplyVoltage']) => {
    const subgroups = subgroupsList?.subgroups;
    const isValidValue = subgroups?.some((subgroup: Subgroup) => supplied >= subgroup.min && supplied <= subgroup.max)
    if (!isValidValue) {
      return "Insira um valor conforme os intervalos ao lado"
    }
    return true
  }

  const hasEnoughCaracteresLength = (value: EditConsumerUnitForm['code'] | EditConsumerUnitForm['title']) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres"
    return true
  }

  const isValueGreaterThenZero = (value: EditConsumerUnitForm['peakContractedDemandInKw'] | EditConsumerUnitForm['offPeakContractedDemandInKw']) => {
    if (value <= 0) return 'Insira um valor maior que 0'
  }



  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }

    handleDiscardForm();
  };

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsConsumerUnitEditFormOpen(false));
  };

  const onSubmitHandler: SubmitHandler<EditConsumerUnitForm> = (data) => {
    console.log(data);
  };

  const getSubgroupsText = () => {
    return <Box p={1}>
      <p>- {subgroupsList?.subgroups[0].max.toLocaleString('pt-BR')} kV ou inferior</p>
      <p>
        - De {subgroupsList?.subgroups[1].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[1].max.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - De {subgroupsList?.subgroups[2].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[2].max.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - {subgroupsList?.subgroups[3].min.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - De {subgroupsList?.subgroups[4].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[4].max.toLocaleString('pt-BR')} kV
      </p>
    </Box>

  }

  //Notificações

  const handleNotification = useCallback(() => { // TODO - Ajustar as notificaçoes
    /*     if (isSuccess) {
          setOpenSucessNotification(true);
          reset();
          setTimeout(() => dispatch(setIsConsumerUnitEditFormOpen(false)), 6000)
        }
        else if (isError) setOpenFailNotification(true); */
    console.log("Resolbver")
  }, [])

  useEffect(() => {
    handleNotification()
  }, [handleNotification])

  const handleCloseDistributorFomrDialog = () => {
    setShouldShowDistributoFormDialog(false)
  }

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailNotification(false)
    setOpenSucessNotification(false);
  };

  return (
    <FormDrawer open={isEditFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Editar Unidade Consumidora</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>* campos obrigatórios</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <FormControlLabel
                        sx={{ marginLeft: 0 }}
                        control={
                          <Switch
                            value={value}
                            onChange={onChange}
                          />
                        }
                        label="Unidade ativa"
                        labelPlacement="start"
                      />
                    </FormControl>
                  )}
                />
              </Box>

              <Typography variant="caption">
                Unidades desativadas não recebem faturas e não geram
                recomendações. Não é possível excluir unidades consumidoras,
                apenas desativá-las.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: "Preencha este campo",
                  validate: hasEnoughCaracteresLength
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome *"
                    placeholder="Ex.: Campus Gama, Biblioteca, Faculdade de Medicina"
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
              <Typography variant="h5">Contrato</Typography>
            </Grid>

            <Grid item xs={12} pb={1}>
              <Alert severity="warning">
                Modifique o contrato apenas em caso de erro de digitação. Para
                alterações legais ou novo contrato, use a opção{" "}
                <strong>Renovar</strong> na tela anterior.
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="code"
                rules={{
                  required: "Preencha este campo",
                  validate: hasEnoughCaracteresLength
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Código *"
                    placeholder="Número da Unidade Consumidora conforme a fatura"
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
                name="distributor"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <FormControl
                    sx={{ minWidth: "200px", maxWidth: "100%" }}
                    error={!!error}
                  >
                    <InputLabel>Distribuidora *</InputLabel>

                    <Select
                      ref={ref}
                      value={value}
                      label="Distribuidora *"
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                      }}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      {distributorList?.map((distributor: DistributorPropsTariffs) => {
                        return (
                          <MenuItem key={distributor.id} value={distributor.id}>{distributor.name}</MenuItem>
                        )
                      })}
                      <MenuItem>
                        <Button
                          onClick={() => setShouldShowDistributoFormDialog(true)}>
                          Adicionar
                        </Button>
                      </MenuItem>
                    </Select>

                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="startDate"
                rules={{
                  required: "Preencha este campo",
                  validate: isValidDate,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    value={value}
                    label="Início da vigência *"
                    minDate={new Date("2010")}
                    disableFuture
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={error?.message ?? " "}
                        error={!!error}
                      />
                    )}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Tooltip
              title={getSubgroupsText()}
              arrow
              placement="right"
              sx={{ color: 'red' }}
            >
              <Grid item xs={8} sm={6}>
                <Controller
                  control={control}
                  name={"supplyVoltage"}
                  rules={{
                    required: "Preencha este campo",
                    validate: isInSomeSugroups
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Tensão de fornecimento *"
                      helperText={error?.message ?? " "}
                      error={!!error}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kV</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 9999.99
                      }
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator={" "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
            </Tooltip>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="tariffFlag"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>Modalidade tarifária *</FormLabel>

                    <RadioGroup value={value} row onChange={onChange}>
                      <FormControlLabel
                        value="G"
                        control={<Radio />}
                        label="Verde"
                      />
                      <FormControlLabel
                        value="B"
                        control={<Radio />}
                        label="Azul"
                      />
                    </RadioGroup>

                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            {tariffFlag === "G" ? (
              <Grid item xs={7}>
                <Controller
                  control={control}
                  name="contracted"
                  rules={{
                    required: "Preencha este campo",
                    validate: isValueGreaterThenZero
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Demanda contratada *"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kW</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 99999.99
                      }
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator={" "}
                      error={Boolean(error)}
                      helperText={error?.message ?? " "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={7}>
                  <Controller
                    control={control}
                    name="peakContractedDemandInKw"
                    rules={{
                      required: "Preencha este campo",
                      validate: isValueGreaterThenZero
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Ponta *"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">kW</InputAdornment>
                          ),
                        }}
                        type="text"
                        allowNegative={false}
                        isAllowed={({ floatValue }) =>
                          !floatValue || floatValue <= 99999.99
                        }
                        decimalScale={2}
                        decimalSeparator=","
                        thousandSeparator={" "}
                        error={Boolean(error)}
                        helperText={error?.message ?? " "}
                        onValueChange={(values) => onChange(values.floatValue)}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={7}>
                  <Controller
                    control={control}
                    name="offPeakContractedDemandInKw"
                    rules={{
                      required: "Preencha este campo",
                      validate: isValueGreaterThenZero
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Fora Ponta *"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">kW</InputAdornment>
                          ),
                        }}
                        type="text"
                        allowNegative={false}
                        isAllowed={({ floatValue }) =>
                          !floatValue || floatValue <= 99999.99
                        }
                        decimalScale={2}
                        decimalSeparator=","
                        thousandSeparator={" "}
                        error={Boolean(error)}
                        helperText={error?.message ?? " "}
                        onValueChange={(values) => onChange(values.floatValue)}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Gravar
              </Button>

              <Button variant="text" onClick={handleCancelEdition}>
                Cancelar
              </Button>
            </Grid>
          </Grid>

          <FormWarningDialog
            open={shouldShowCancelDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
            entity={'unidade consumidora'}
          />

          <DistributorCreateFormDialog
            open={shouldShowDistributoFormDialog}
            onClose={handleCloseDistributorFomrDialog}
          />

          <SucessNotification
            open={openSucessNotification}
            message={"Unidade Consumidora adicionada com sucesso!"}
            handleClose={handleCloseNotification}
          />

          <FailNotification
            open={openFailNotification}
            message={"Erro ao adicionar unidade consumidora. Verifique se essa unidade já existe!"}
            handleClose={handleCloseNotification}
          />
        </Box>
      </FormProvider>
    </FormDrawer>
  );
};

export default ConsumerUnitEditForm;
