import { EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface InstitutionEditButtonProps {
  institutionId: number;
}

const InstitutionEditButton = ({
  institutionId,
}: InstitutionEditButtonProps) => {
  const handleClick = () => {
    console.log("Edit institution", institutionId);
  };

  return (
    <IconButton size="small" disabled onClick={handleClick}>
      <EditRounded />
    </IconButton>
  );
};

export default InstitutionEditButton;
