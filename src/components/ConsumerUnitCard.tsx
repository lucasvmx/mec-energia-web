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
import { useEffect, useState } from "react";

interface Pendency {
  month: number;
  year: number;
}

interface ConsumerUnitCardProps {
  title: string;
  disabled?: boolean;
  favorite?: boolean;
  pendencies?: Pendency[];
}

const ConsumerUnitCard = ({
  title,
  disabled = false,
  favorite = false,
  pendencies = [],
}: ConsumerUnitCardProps) => {
  const [longMonth, setLongMonth] = useState("");
  const [badgeCount, setBadgeCount] = useState(0);

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

  return (
    <Card
      variant={disabled ? "outlined" : "elevation"}
      sx={{
        height: 196,
        display: "flex",
        flexDirection: "column",
      }}
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
              <Button variant="outlined">{longMonth}</Button>
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
