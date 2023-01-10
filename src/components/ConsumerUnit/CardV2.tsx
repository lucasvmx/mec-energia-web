import { useMemo } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Button, Typography } from "@mui/material";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { CardProps } from "@/types/app";
import { ConsumerUnit } from "@/types/consumerUnit";
import Card from "@/components/Card";

interface ConsumerUnitCardProps extends CardProps {
  id: ConsumerUnit["id"];
  isActive: ConsumerUnit["isActive"];
  isFavorite: ConsumerUnit["isFavorite"];
  pendingEnergyBillsNumber: ConsumerUnit["pendingEnergyBillsNumber"];
  isCurrentEnergyBillFilled: ConsumerUnit["isCurrentEnergyBillFilled"];
}

interface ConsumerUnitCardActionProps {
  dense: CardProps["dense"];
  pendingEnergyBillsNumber: ConsumerUnit["pendingEnergyBillsNumber"];
  isCurrentEnergyBillFilled: ConsumerUnit["isCurrentEnergyBillFilled"];
  variant: CardProps["variant"];
}

const ConsumerUnitCardAction = ({
  dense,
  pendingEnergyBillsNumber,
  isCurrentEnergyBillFilled,
  variant,
}: ConsumerUnitCardActionProps) => {
  const isWarning = variant === "warning";
  const totalPendenciesCount =
    pendingEnergyBillsNumber + (isCurrentEnergyBillFilled ? 0 : 1);
  const pendenciesMessage =
    totalPendenciesCount > 0
      ? `${totalPendenciesCount} faturas pendentes`
      : "Em dia";

  if (isCurrentEnergyBillFilled || dense) {
    return (
      <Typography color={isWarning ? "text.primary" : "text.secondary"}>
        {pendenciesMessage}
      </Typography>
    );
  }

  return (
    <Button
      sx={{
        ...(isWarning && {
          color: "black",
          borderColor: "black",
          ":hover": {
            borderColor: "black",
          },
        }),
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
  isActive,
  isFavorite,
  id,
  pendingEnergyBillsNumber,
  isCurrentEnergyBillFilled,
  name,
  dense,
  selected,
}: ConsumerUnitCardProps) => {
  const router = useRouter();

  const variant = useMemo(() => {
    if (!isActive) {
      return "disabled";
    }

    if (pendingEnergyBillsNumber > 0) {
      return "warning";
    }

    return "default";
  }, [isActive, pendingEnergyBillsNumber]);

  const handleConsumerUnitClick = () => {
    router.push(`/uc/${id}`);
  };

  return (
    <Card
      name={name}
      variant={variant}
      isFavorite={isFavorite}
      action={
        <ConsumerUnitCardAction
          dense={dense}
          pendingEnergyBillsNumber={pendingEnergyBillsNumber}
          isCurrentEnergyBillFilled={isCurrentEnergyBillFilled}
          variant={variant}
        />
      }
      ActionIcon={
        variant === "warning" ? ReceiptLongRoundedIcon : InsightsRoundedIcon
      }
      actionIconBadgeContent={pendingEnergyBillsNumber}
      dense={dense}
      selected={selected}
      onClick={handleConsumerUnitClick}
    />
  );
};

export default ConsumerUnitCard;
