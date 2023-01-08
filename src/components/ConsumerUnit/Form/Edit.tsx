import { useEffect, useState } from "react";
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

const defaultValues: EditConsumerUnitForm = {
  isActive: true,
  title: "",
  code: "",
  distributor: "",
  startDate: null,
  supplyVoltage: "",
  tariffFlag: "G",
  contracted: "",
  peakContracted: "",
  outOfPeakContracted: "",
};

const ConsumerUnitEditForm = (currentConsumerUnitId: number) => {

  const { data: session } = useSession()
  const { data: subgroupsList } = useGetSubgroupsQuery()
  const { data: distributorList } = useGetDistributorsQuery(session?.user?.university_id || 0)
  const { data: contract } = useGetContractQuery(1)
  console.log("currentConsumerUnitId", currentConsumerUnitId)

  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsConsumerUnitEditFormOpen);
  const [shouldOpenDiscardDialog, setShouldOpenDiscardDialog] = useState(false);

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

  useEffect(() => {
    const {
      title,
      code,
      contracted,
    } = defaultValues;

    const currentContract = contract?.find(con => con.endDate === null)
    setValue("isActive", true) //TODO COrrir com o valor vindo da api
    setValue("title", title);
    setValue("code", code);
    setValue("distributor", currentContract?.distributor as number)
    setValue("startDate", currentContract?.startDate as Date)
    setValue("contracted", contracted);
    setValue("supplyVoltage", Number(currentContract?.supplyVoltage))
    setValue("tariffFlag", currentContract?.tariffFlag || 'G')
    setValue("peakContracted", currentContract?.peakContractedDemandInKw as number);
    setValue("outOfPeakContracted", currentContract?.offPeakContractedDemandInKw as number);
  }, [contract, setValue, tariffFlag]);

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

  const handleCloseDialog = () => {
    setShouldOpenDiscardDialog(false);
  };

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldOpenDiscardDialog(true);
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
                            defaultChecked
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
                rules={{ required: "Preencha este campo" }}
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
              <Controller
                control={control}
                name="code"
                rules={{ required: "Preencha este campo" }}
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
                      {/* <MenuItem>
                        <Button
                          onClick={() => setShouldShowCancelDistributoFormDialog(true)}>
                          Adicionar
                        </Button>
                      </MenuItem> */}
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
                  rules={{ required: "Preencha este campo" }}
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
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>Modalidade tarifária *</FormLabel>

                    <RadioGroup value={value} row onChange={onChange}>
                      <FormControlLabel
                        value="green"
                        control={<Radio />}
                        label="Verde"
                      />
                      <FormControlLabel
                        value="blue"
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
                  rules={{ required: "Preencha este campo" }}
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
                    name="peakContracted"
                    rules={{ required: "Preencha este campo" }}
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
                    name="outOfPeakContracted"
                    rules={{ required: "Preencha este campo" }}
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
            open={shouldOpenDiscardDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
            entity={'unidade consumidora'}
          />
        </Box>
      </FormProvider>
    </FormDrawer>
  );
};

export default ConsumerUnitEditForm;
