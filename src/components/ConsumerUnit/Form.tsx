import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsConsumerUnitFormOpen,
  selectOpenedConsumerUnitFormType,
  setOpenedConsumerUnitFormType,
} from "../../store/appSlice";

const ConsumerUnitForm = () => {
  const dispatch = useDispatch();
  const isFormOpen = useSelector(selectIsConsumerUnitFormOpen);
  const formType = useSelector(selectOpenedConsumerUnitFormType);

  const handleDrawerClose = () => {
    dispatch(setOpenedConsumerUnitFormType(null));
  };

  return (
    <Drawer anchor={"bottom"} open={isFormOpen} onClose={handleDrawerClose}>
      {formType}
    </Drawer>
  );
};

export default ConsumerUnitForm;
