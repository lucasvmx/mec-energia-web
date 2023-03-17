import { Fragment, useCallback } from "react";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const DistributorHeaderAction = () => {
  const handleOnCreateDistributorButtonClick = useCallback(() => {
    console.log("handleOnCreateDistributorButtonClick");
  }, []);

  return (
    <Fragment>
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={handleOnCreateDistributorButtonClick}
      >
        Distribuidora
      </Button>

      {/* Colocar form de adicionar distribuidora aqui */}
    </Fragment>
  );
};

export default DistributorHeaderAction;
