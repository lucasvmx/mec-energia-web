import { Box, Container, Grid } from "@mui/material";
import ConsumerUnitCard from "../ConsumerUnit/Card";
import { useRouter } from "next/router";
import DistributorCard from "./DistributorCard";
import DistributorProps from "../../types/distributor";
const mockedDistributor: Array<DistributorProps> = [
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

const DistributorCardGrid = () => {
  return (
    // Can't use Grid componente https://github.com/mui/material-ui/issues/34605
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={2}
    >
      {mockedDistributor.map((distributor) => (
        <DistributorCard
          key={distributor.id}
          id={distributor.id}
          title={distributor.title}
          disabled={distributor.disabled}
          linkedUC={distributor.linkedUC}
          tariffs={distributor.tariffs}
        />
      ))}
    </Box>
  );
};

export default DistributorCardGrid;