import { Box, Container, Grid } from "@mui/material";
import ConsumerUnitCard from "./ConsumerUnitCard";
import { useRouter } from "next/router";
import DistributorCard from "./DistributorCard";

const mockedConsumerUnits = [
  {
    id: 1,
    title: "Campus Darcy Ribeiro Gleba A1",
    disabled: false,
    favorite: true,
    pendencies: [
      { month: 11, year: 2022 },
      { month: 10, year: 2022 },
    ],
  },
  {
    id: 2,
    title: "Campus Gama 2",
    disabled: false,
    favorite: true,
    pendencies: [{ month: 11, year: 2022 }],
  },
  {
    id: 3,
    title: "Campus Ceilândia 3",
    disabled: false,
    favorite: true,
    pendencies: [
      { month: 11, year: 2022 },
      { month: 10, year: 2022 },
      { month: 9, year: 2022 },
    ],
  },
  {
    id: 4,
    title: "Campus Darcy Ribeiro Gleba A 4",
    disabled: false,
  },
  {
    id: 5,
    title: "Campus Gama 5",
    disabled: false,
  },
  {
    id: 6,
    title: "Campus Ceilândia 6",
    disabled: false,
  },
  {
    id: 7,
    title: "Campus Darcy Ribeiro Gleba A 7",
    disabled: true,
  },
  {
    id: 8,
    title: "Campus Gama 8",
    disabled: true,
  },
  {
    id: 9,
    title: "Campus Ceilândia 9",
    disabled: true,
  },
];

interface Distributor {

}

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

const ConsumerUnitCardGrid = () => {
  const router = useRouter();
  return (
    // Can't use Grid componente https://github.com/mui/material-ui/issues/34605
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={2}
    >
      {router.pathname === "/uc/[id]" && mockedConsumerUnits.map((consumerUnit) => (
        <ConsumerUnitCard
          key={consumerUnit.id}
          id={consumerUnit.id}
          title={consumerUnit.title}
          pendencies={consumerUnit.pendencies}
          disabled={consumerUnit.disabled}
          favorite={consumerUnit.favorite}
        />
      ))}
      {router.pathname === "/dt/[id]" && mockedDistributor.map((distributor) => (
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

export default ConsumerUnitCardGrid;