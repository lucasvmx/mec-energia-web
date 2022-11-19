import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Receipt, Star, StarOutline, TrendingUp } from "@mui/icons-material";
import { DistributorProps, DistributorPropsTariffs } from "../../types/distributor";

const DistributorCard = ({
  id,
  name: title,
  disabled = false,
  tariffs,
  consumer_units
}: DistributorPropsTariffs) => {
  const router = useRouter();
  const DistributorUrl = `/dt/${id}`;
  const [overdue, setOverdue] = useState(false);
  const [textBottomCard, setTextBottomCard] = useState('');

  useEffect(() => {
    const isOverdue = tariffs?.find(tariff => tariff.overdue === true)
    if (isOverdue !== undefined) setOverdue(true)
    else setOverdue(false);
  }, [])

  const handleCardClick = () => {
    router.push(DistributorUrl);
  };

  useEffect(() => {
    handleTextBottomCard();
  }, [])
  const handleTextBottomCard = () => {
    if (disabled) setTextBottomCard("Desativada")
    else if (tariffs?.find(tariff => tariff.overdue === true)) setTextBottomCard("Tarifas pendentes")
    else if (consumer_units === 0) setTextBottomCard("Nenhuma unidade consumidora")
    else if (consumer_units === 1) setTextBottomCard("1 unidade consumidora")
    else if (consumer_units) setTextBottomCard(`${consumer_units} unidades consumidoras`)
  }

  return (
    <Card
      sx={{
        height: 120,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        background: overdue ? 'grey' : '',
        color: overdue ? 'white' : ''
      }}
      variant={disabled ? "outlined" : "elevation"}
      onClick={handleCardClick}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          pt: 0,
        }}
      >
        <Typography variant="h5">{title}</Typography>
      </CardContent>

      <Divider sx={{ background: overdue ? 'white' : '' }} />
      <Box ml={1} p={1}>
        <Typography>{textBottomCard}</Typography>
      </Box>
    </Card >
  );
};

export default DistributorCard;
