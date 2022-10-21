import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitCreateFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";

const ConsumerUnitCreateForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const isCreateFormOpen = useSelector(selectIsConsumerUnitCreateFormOpen);

  const handleCloseDrawer = () => {
    // TODO check if data changed

    dispatch(setIsConsumerUnitCreateFormOpen(false));
  };

  return (
    <FormDrawer
      open={isCreateFormOpen}
      handleCloseDrawer={handleCloseDrawer}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Adicionar Unidade Consumidora</Typography>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                value={value}
                label="Nome"
                helperText="Ex.: Campus Gama, Biblioteca, Faculdade de Medicina"
                onChange={onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                value={value}
                label="Código"
                helperText="Número da Unidade Consumidora conforme a fatura"
                onChange={onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="beginDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel>Distribuidora</InputLabel>

                <Select value={value} label="Distribuidora" onChange={onChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={8}>
          {/* TODO Handle responsive datepicker */}
          <Controller
            name="provided"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                views={["year", "month"]}
                label="Início da vigência"
                minDate={moment("2010")}
                disableFuture
                renderInput={(params) => (
                  <TextField {...params} fullWidth defaultValue={0} />
                )}
                onChange={onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="contracted"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                label="Tensão de fornecimento"
                fullWidth
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                label="Demanda contratada"
                fullWidth
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

        <Grid item>
          <Button variant="contained">Gravar</Button>
        </Grid>

        <Grid item>
          <Button variant="text" onClick={handleCloseDrawer}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </FormDrawer>
  );
};

export default ConsumerUnitCreateForm;
