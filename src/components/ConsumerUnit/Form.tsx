import { Container, Drawer, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ConsumerUnitFormEnum,
  selectIsConsumerUnitFormOpen,
  selectOpenedConsumerUnitFormType,
  setOpenedConsumerUnitFormType,
} from "../../store/appSlice";

const consumerUnitTitleMap = new Map<ConsumerUnitFormEnum, string>([
  [ConsumerUnitFormEnum.CREATE, "Adicionar"],
  [ConsumerUnitFormEnum.EDIT, "Editar"],
]);

// TODO Remove formType!
const ConsumerUnitForm = () => {
  const dispatch = useDispatch();
  const isFormOpen = useSelector(selectIsConsumerUnitFormOpen);
  const formType = useSelector(selectOpenedConsumerUnitFormType);

  const handleDrawerClose = () => {
    dispatch(setOpenedConsumerUnitFormType(null));
  };

  return (
    <Drawer anchor="bottom" open={isFormOpen} onClose={handleDrawerClose}>
      <Container maxWidth="md">
        <Typography variant="h4">
          {consumerUnitTitleMap.get(formType!)} Unidade Consumidora
        </Typography>
      </Container>
    </Drawer>
  );
};

export default ConsumerUnitForm;
