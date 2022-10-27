import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

import {
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
} from "../../store/appSlice";

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
import ConsumerUnitCardGrid from "../../components/ConsumerUnit/CardGrid";
import DefaultTemplate from "../../templates/DefaultTemplate";
import ConsumerUnitCreateForm from "../../components/ConsumerUnit/Form/Create";
import ConsumerUnitEditForm from "../../components/ConsumerUnit/Form/Edit";
import Guide from "../../components/Guides/Guide";

const ConsumerUnitPage: NextPage = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleCreateConsumerUnitClick = () => {
    dispatch(setIsConsumerUnitCreateFormOpen(true));
  };

  const handleEditConsumerUnitClick = () => {
    dispatch(setIsConsumerUnitEditFormOpen(true));
  };

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
              <Button
                variant="outlined"
                onClick={handleCreateConsumerUnitClick}
              >
                Adicionar
              </Button>
            </Toolbar>

            <Box position="relative" width="350px" height="calc(100% - 64px)">
              <Box sx={{ inset: 0 }} position="absolute" overflow="auto" p={3}>
                <ConsumerUnitCardGrid />
              </Box>
            </Box>
          </Box>
        )}

        <Box p={3} sx={{ width: '100%' }}>
          <Box display="flex">
            <Typography variant="h3">Campus Gama</Typography>

            <IconButton color="inherit" onClick={handleEditConsumerUnitClick}>
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
          <Box>
            <Guide />
          </Box>
        </Box>
      </Box>

      <ConsumerUnitCreateForm />
      <ConsumerUnitEditForm />
    </DefaultTemplate>
  );
};

export default ConsumerUnitPage;
