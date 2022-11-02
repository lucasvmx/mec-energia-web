import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import moment, { Moment } from "moment";
import { DatePicker } from "@mui/x-date-pickers";

import {
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

import {
  selectIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitCreateFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";

interface FormData {
  title: string;
  code: string;
  supplier: string;
  startDate: Moment | string;
  supplied: number | "";
  tariffType: string;
  contracted: number | "";
}

const ConsumerUnitCreateForm = () => {
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsConsumerUnitCreateFormOpen);

  const { control, reset, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleCloseDrawer = () => {
    reset();
    dispatch(setIsConsumerUnitCreateFormOpen(false));
  };

  return (
    <FormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCloseDrawer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Adicionar Unidade Consumidora</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="title"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  fullWidth
                  value={value}
                  label="Nome"
                  error={!!error}
                  helperText={
                    error?.message ??
                    "Ex.: Campus Gama, Biblioteca, Faculdade de Medicina"
                  }
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
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  value={value}
                  label="Código"
                  error={!!error}
                  helperText={
                    error?.message ??
                    "Número da Unidade Consumidora conforme a fatura"
                  }
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">Contrato</Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="supplier"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth error={!!error}>
                  <InputLabel>Distribuidora</InputLabel>

                  <Select
                    value={value}
                    label="Distribuidora"
                    onChange={onChange}
                  >
                    <MenuItem value="a">Distribuidora A</MenuItem>

                    <MenuItem value="b">Distribuidora B</MenuItem>
                  </Select>

                  <FormHelperText>
                    {error?.message ??
                      "Número da Unidade Consumidora conforme a fatura"}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="startDate"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DatePicker
                  value={value}
                  views={["year", "month"]}
                  openTo="year"
                  label="Início da vigência"
                  minDate={moment("2010")}
                  disableFuture
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!error}
                      helperText={error?.message ?? " "}
                    />
                  )}
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={8} md={6}>
            <Controller
              control={control}
              name="supplied"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  value={value}
                  type="number"
                  label="Tensão de fornecimento"
                  fullWidth
                  error={!!error}
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

          <Grid item xs={12}>
            <Controller
              control={control}
              name="tariffType"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl error={!!error}>
                  <FormLabel>Modalidade tarifária</FormLabel>

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

          <Grid item xs={8} md={6}>
            <Controller
              control={control}
              name="contracted"
              defaultValue=""
              rules={{ required: "Campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  value={value}
                  type="number"
                  inputProps={{ type: "number" }}
                  label="Demanda contratada"
                  fullWidth
                  error={!!error}
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

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Gravar
            </Button>

            <Button variant="text" onClick={handleCloseDrawer}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormDrawer>
  );
};

export default ConsumerUnitCreateForm;
