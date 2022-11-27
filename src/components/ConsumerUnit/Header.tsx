import { useDispatch } from "react-redux";

import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { setIsConsumerUnitEditFormOpen } from "../../store/appSlice";

const ConsumerUnitHeader = () => {
  const dispatch = useDispatch();

  const handleEditConsumerUnitClick = () => {
    dispatch(setIsConsumerUnitEditFormOpen(true));
  };

  return (
    <>
      <Box display="flex">
        <Typography variant="h3">Campus Gama</Typography>

        <IconButton color="inherit" onClick={handleEditConsumerUnitClick}>
          <EditIcon fontSize="large" />
        </IconButton>

        <IconButton color="inherit">
          <StarBorderIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box mt={1}>
        <Typography>
          Unidade consumidora: <strong>10/979389-4</strong>
        </Typography>
      </Box>
    </>
  );
};

export default ConsumerUnitHeader;
