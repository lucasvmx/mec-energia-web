import { useMemo } from "react";
import { Typography } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { Distributor } from "@/types/supplier";
import Card from "@/components/Card";

const DistributorCard = ({ disabled, hasPendencies, title }: Distributor) => {
  const variant = useMemo(() => {
    if (disabled) {
      return "disabled";
    }

    if (hasPendencies) {
      return "warning";
    }

    return "default";
  }, [disabled, hasPendencies]);

  return (
    <Card
      title={title}
      variant={variant}
      {...(hasPendencies && {
        action: <Typography>Tarifas pendentes</Typography>,
        ActionIcon: AttachMoneyRoundedIcon,
        actionIconBadgeContent: "!",
      })}
    />
  );
};

export default DistributorCard;
