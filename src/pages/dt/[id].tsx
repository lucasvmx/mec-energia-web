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
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "../../theme";
import DefaultTemplate from "../../templates/DefaultTemplate";
import DistributorCardGrid from "../../components/Distributor/DistributorCardGrid";
import DistributorProps from "../../types/distributor";
import DistributorContainer from "../../components/Distributor/DistributorContainer";
import { mockedDistributor } from "../../mocks/mockedDistributor";


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
                <DistributorCardGrid />
              </Box>
            </Box>
          </Box>
        )}

        <Box p={3} width='90%'>
          <Box display="flex">
            <Typography variant="h3">CEB</Typography>

            <IconButton color="inherit">
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box mt={1}>
            <Typography>
              CNPJ: <strong>07.523.555/0001-63</strong>
            </Typography>
          </Box>
          <Box mt={5} width="90%" m="auto">
            <DistributorContainer />
          </Box>
        </Box>
      </Box>
    </DefaultTemplate >
  );
};

export default DistributorPage;
