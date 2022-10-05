import { NextComponentType } from "next";
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
import { Receipt, StarOutline, TrendingUp } from "@mui/icons-material";

const UCCard: NextComponentType = () => {
  return (
    <Card
      sx={{
        minHeight: 195,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActions>
        <IconButton color="inherit">
          <StarOutline />
        </IconButton>
      </CardActions>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          pt: 0,
        }}
      >
        <Typography variant="h5">Campus Darcy Ribeiro Darcy Ribeiro</Typography>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="outlined">Lançar outubro</Button>

        <Box>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="warning">
              <Receipt />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <TrendingUp />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default UCCard;
