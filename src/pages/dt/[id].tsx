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

const mockedDistributor = [
  {
    id: 1,
    title: "CEMIG",
    cnpj: "07.523.555/0001-67",
    disabled: false,
    linkedUC: ['Campos Planaltina'],
    tariffs: [
      {
        subgroup: 4,
        start: new Date("2021-10-21"),
        end: new Date("2023-10-21"),
      }
    ]
  },
  {
    id: 2,
    title: "Enel",
    cnpj: "07.523.555/0001-61",
    disabled: false,
    linkedUC: []
  },
  {
    id: 3,
    title: "Neoenergia",
    cnpj: "07.523.555/0001-62",
    disabled: false,
    linkedUC: ['Fazenda Agua Limpa'],
    tariffs: [
      {
        subgroup: 4,
        start: new Date("2021-10-21"),
        end: new Date("2023-10-21"),
      },
      {
        subgroup: 3,
        start: new Date("2021-05-20"),
        end: new Date("2022-10-21"),
      }
    ],
  },
  {
    id: 4,
    title: "CEB",
    cnpj: "07.523.555/0001-63",
    disabled: true,
  },
];

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
            <Typography variant="h3">Dist</Typography>

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