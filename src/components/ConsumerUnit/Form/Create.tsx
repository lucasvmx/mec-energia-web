import { Box, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitCreateFormOpen,
} from "../../../store/appSlice";
import ConsumerUnitFormDrawer from "./Drawer";

const ConsumerUnitCreateForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const isCreateFormOpen = useSelector(selectIsConsumerUnitCreateFormOpen);

  const handleCloseDrawer = () => {
    dispatch(setIsConsumerUnitCreateFormOpen(false));
  };

  return (
    <ConsumerUnitFormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCloseDrawer}>
      <Box py={3}>
        <Typography variant="h4">Adicionar Unidade Consumidora</Typography>
      </Box>

      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            value={value}
            label="Nome"
            helperText="Ex: Campus central, Biblioteca, Faculdade de Tecnologia"
            onChange={onChange}
          />
        )}
      />
    </ConsumerUnitFormDrawer>
  );
};

export default ConsumerUnitCreateForm;
