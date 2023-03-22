import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditPersonForm from "@/components/Person/Form/EditPersonForm";
import { setIsPersonEditFormOpen } from "@/store/appSlice";

const ProfileEditButton = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setIsPersonEditFormOpen(true));
  }, [dispatch]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditRoundedIcon />}
        size="small"
        onClick={handleClick}
      >
        Editar
      </Button>

      <EditPersonForm />
    </>
  );
};

export default ProfileEditButton;
