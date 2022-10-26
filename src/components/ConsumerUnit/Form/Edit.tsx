import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsConsumerUnitEditFormOpen,
  setIsConsumerUnitEditFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";

const ConsumerUnitEditForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const isEditFormOpen = useSelector(selectIsConsumerUnitEditFormOpen);

  const handleCloseDrawer = () => {
    // TODO check if data changed

    dispatch(setIsConsumerUnitEditFormOpen(false));
  };

  return (
    <FormDrawer open={isEditFormOpen} handleCloseDrawer={handleCloseDrawer}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Editar Unidade Consumidora</Typography>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="isActive"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch value={value} defaultChecked onChange={onChange} />
                  }
                  label="Unidade ativa"
                />

                <FormHelperText>
                  Unidades desativadas não recebem faturas e não geram
                  recomendações. Não é possível excluir unidades consumidoras,
                  apenas desativá-las.
                </FormHelperText>
              </FormGroup>
            )}
          />
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
          <Typography variant="h5">Contrato</Typography>
        </Grid>

        <Grid item xs={12}>
          <Alert severity="warning">
            Modifique o contrato apenas em caso de erro de digitação. Para
            alterações legais ou novo contrato, use a opção{" "}
            <strong>Renovar</strong> na tela anterior.
          </Alert>
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

                <FormHelperText> </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                  <TextField
                    {...params}
                    fullWidth
                    defaultValue={0}
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  label="Tensão de fornecimento"
                  fullWidth
                  helperText=" "
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
              name="contracted"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  label="Demanda contratada"
                  fullWidth
                  helperText=" "
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

export default ConsumerUnitEditForm;
