import {
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
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsContractCreateFormOpen,
  setIsContractCreateFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";

const ContractCreateForm = () => {
  const { handleSubmit, control, formState: { errors }, register, reset } = useForm();
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsContractCreateFormOpen);

  const handleCloseDrawer = () => {
    // TODO check if data changed
    reset()
    dispatch(setIsContractCreateFormOpen(false));
  };

  const submit = (data: any) => {
    console.log("Valor", data)
  }

  const msgError: string = "Campo obrigatório"

  return (
    <FormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCloseDrawer}>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography >Renovar Contrato</Typography>
            <Typography variant="h4">Campos Gama</Typography>
            <Typography>* campos obrigatórios</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="code"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              defaultValue=""
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  error={!!errors.code}
                  inputRef={ref}
                  value={value}
                  label="Código *"
                  helperText={error?.message ?? "Código ou número da Unidade Consumidora conforme a faturasa"}
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="distributor"
              control={control}
              rules={{ required: msgError }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth>
                  <InputLabel>Distribuidora *</InputLabel>

                  <Select value={value} label="Distribuidora" onChange={onChange} error={!!errors.distributor}>
                    <MenuItem value="enel">
                      <em>Enel</em>
                    </MenuItem>
                    <MenuItem value="neoenergia">
                      <em>Neoenergia</em>
                    </MenuItem>
                  </Select>

                  <FormHelperText error>{error?.message ?? " "} </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* TODO Handle responsive datepicker */}
            <Controller
              name="beginDate"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  views={["year", "month"]}
                  label="Início da vigência"
                  minDate={moment("2010")}
                  disableFuture
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      helperText=" "
                    />
                  )}
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contracted"
                control={control}
                rules={{ required: msgError }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    type="number"
                    error={!!errors.contracted}
                    inputRef={ref}
                    label="Tensão de fornecimento *"
                    fullWidth
                    helperText={error?.message ?? " "}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kV</InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <Controller
                name="tariffmod"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <FormControl>
                    <FormLabel id="modality">Modalidade Tarifária *</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="modality"
                      defaultValue="green"
                      name="radio-buttons-modality"
                      onChange={onChange}
                      value={value}
                    >
                      <FormControlLabel value="green" control={<Radio />} label="Verde" />
                      <FormControlLabel value="blue" control={<Radio />} label="Azul" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="demand"
                control={control}
                rules={{ required: msgError }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    type="number"
                    error={!!errors.demand}
                    label="Demanda contratada *"
                    fullWidth
                    inputRef={ref}
                    helperText={error?.message ?? " "}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kW</InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained">Renovar</Button>
          </Grid>

          <Grid item>
            <Button variant="text" onClick={handleCloseDrawer}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormDrawer>
  );
};

export default ContractCreateForm;