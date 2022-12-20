import { useMemo } from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CardProps } from "@/types/app";
import { ConsumerUnit } from "@/types/consumerUnit";
import { Button, Typography } from "@mui/material";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import Card from "@/components/Card";

interface ConsumerUnitCardActionProps {
  postedCurrentInvoice: ConsumerUnit["postedCurrentInvoice"];
  variant: CardProps["variant"];
}

const ConsumerUnitCardAction = ({
  postedCurrentInvoice,
  variant,
}: ConsumerUnitCardActionProps) => {
  const isWarning = variant === "warning";

  if (postedCurrentInvoice) {
    return (
      <Typography color={isWarning ? "text.primary" : "text.secondary"}>
        Em dia
      </Typography>
    );
  }

  return (
    <Button
      sx={{
        ...(isWarning && { color: "black", borderColor: "black" }),
      }}
      variant={isWarning ? "outlined" : "contained"}
      size="small"
      disableElevation
    >
      Lançar {format(new Date(), "MMMM", { locale: ptBR })}
    </Button>
  );
};

const ConsumerUnitCard = ({
  disabled,
  favorite,
  pendenciesCount,
  postedCurrentInvoice,
  title,
}: ConsumerUnit) => {
  const variant = useMemo(() => {
    if (disabled) {
      return "disabled";
    }

    if (pendenciesCount > 0) {
      return "warning";
    }

    return "default";
  }, [disabled, pendenciesCount]);

  return (
    <Card
      title={title}
      variant={variant}
      favorite={favorite}
      action={
        <ConsumerUnitCardAction
          postedCurrentInvoice={postedCurrentInvoice}
          variant={variant}
        />
      }
      ActionIcon={
        variant === "warning" ? ReceiptLongRoundedIcon : InsightsRoundedIcon
      }
      actionIconBadgeContent={pendenciesCount}
    />
  );
};

export default ConsumerUnitCard;
