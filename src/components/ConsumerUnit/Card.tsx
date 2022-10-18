import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Receipt, Star, StarOutline, TrendingUp } from "@mui/icons-material";

interface Pendency {
  month: number;
  year: number;
}

interface ConsumerUnitCardProps {
  id: number;
  title: string;
  disabled?: boolean;
  favorite?: boolean;
  pendencies?: Pendency[];
}

const ConsumerUnitCard = ({
  id,
  title,
  disabled = false,
  favorite = false,
  pendencies = [],
}: ConsumerUnitCardProps) => {
  const router = useRouter();
  const [longMonth, setLongMonth] = useState("");
  const [badgeCount, setBadgeCount] = useState(0);
  const consumerUnitUrl = `/uc/${id}`;

  useEffect(() => {
    if (pendencies.length == 0) {
      setBadgeCount(0);
      return;
    }

    const { year, month } = pendencies[pendencies.length - 1];
    const date = new Date(year, month);
    const longMonth = date.toLocaleString("pt-br", { month: "long" });

    setLongMonth(longMonth);
    setBadgeCount(pendencies.length - 1);
  }, [pendencies]);

  useEffect(() => {
    if (favorite) {
      router.prefetch(consumerUnitUrl);
    }
  }, [favorite]);

  const handleCardClick = () => {
    router.push(consumerUnitUrl);
  };

  return (
    <Card
      sx={{
        height: 196,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      variant={disabled ? "outlined" : "elevation"}
      onClick={handleCardClick}
    >
      {!disabled && (
        <CardActions>
          <IconButton color="inherit">
            {favorite ? <Star /> : <StarOutline />}
          </IconButton>
        </CardActions>
      )}

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

      <Divider />

      <CardActions sx={{ justifyContent: "space-between", minHeight: "56px" }}>
        {disabled ? (
          <Box ml={1}>
            <Typography>Desativado</Typography>
          </Box>
        ) : (
          <>
            {pendencies.length == 0 ? (
              <Box ml={1}>
                <Typography>Em dia</Typography>
              </Box>
            ) : (
              <Button variant="outlined" size="small">
                Lançar {longMonth}
              </Button>
            )}

            <Box>
              <IconButton color="inherit">
                <Badge badgeContent={badgeCount} color="warning">
                  <Receipt />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <TrendingUp />
              </IconButton>
            </Box>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ConsumerUnitCard;
