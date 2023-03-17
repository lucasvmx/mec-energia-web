import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { User, UserRole } from "@/types/person";
import { UserRoleLabelMap } from "./constants";

const UserRoleSelect = ({ type }: { type: User["type"] }) => {
  const handleChange = (event: SelectChangeEvent<UserRole>) => {
    console.log(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select value={type} size="small" onChange={handleChange} disabled>
        <MenuItem value={UserRole.UNIVERSITY_USER}>
          {UserRoleLabelMap[UserRole.UNIVERSITY_USER]}
        </MenuItem>
        <MenuItem value={UserRole.UNIVERSITY_ADMIN}>
          {UserRoleLabelMap[UserRole.UNIVERSITY_ADMIN]}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default UserRoleSelect;
