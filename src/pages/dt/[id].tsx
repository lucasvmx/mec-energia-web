import { NextPage } from "next";
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import theme from "../../theme";
import ConsumerUnitCardGrid from "../../components/ConsumerUnitCardGrid";
import DefaultTemplate from "../../templates/DefaultTemplate";

const DistributorPage: NextPage = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <DefaultTemplate disableGutters>
      <Box display="flex" height="100%">
        {isDesktop && (
          <Box width="350px" borderRight="1px solid rgba(0, 0, 0, 0.12)">
            <Toolbar
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                justifyContent: "end",
              }}
            >
              <Button variant="outlined">Adicionar</Button>
            </Toolbar>

            <Box position="relative" width="350px" height="calc(100% - 64px)">
              <Box sx={{ inset: 0 }} position="absolute" overflow="auto" p={3}>
                <ConsumerUnitCardGrid />
              </Box>
            </Box>
          </Box>
        )}

        <Box p={3}>
          <Box display="flex">
            <Typography variant="h3">Campus Gama</Typography>

            <IconButton color="inherit">
              <EditIcon fontSize="large" />
            </IconButton>

            <IconButton color="inherit">
              <StarBorderIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box mt={1}>
            <Typography>
              Unidade consumidora: <strong>10/979389-4</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </DefaultTemplate>
  );
};

export default DistributorPage;
