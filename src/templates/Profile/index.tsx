import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { Box, Typography } from "@mui/material";
import UserRoleChip from "@/components/Person/Role/Chip";

import ProfileEditButton from "./EditButton";
import ProfileResetPasswordButton from "./ResetPasswordButton";

const ProfileTemplate = () => {
  const { data: session } = useSession();
  const userFullName = useMemo(() => {
    if (!session) {
      return null;
    }

    return `${session.user.firstName} ${session.user.lastName}`;
  }, [session]);

  if (!session) {
    return <>Carregando...</>;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h4">{userFullName}</Typography>

        <Box ml={2}>
          <ProfileEditButton personId={session.user.id as number} />
        </Box>

        <Box ml={2}>
          <ProfileResetPasswordButton />
        </Box>
      </Box>

      <Typography variant="subtitle1">{session.user.email}</Typography>

      <Box mt={3}>
        <UserRoleChip role={session.user.type} />
      </Box>
    </Box>
  );
};

export default ProfileTemplate;
